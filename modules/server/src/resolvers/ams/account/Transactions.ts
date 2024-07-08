import {MerchantAPIApi} from '@blts/ams-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {getExternalSystem} from './ExternalSystemReference';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {getExternalSystemReference} from '../../atlas/customer/ExternalSystemReference';
import config from '../../../config';

/*
 query {
    accountTransactions(input:{startDate:"2021-07-31",endDate:"2022-08-31"}) {
      totalCount
     edges {
      cursor
      node {
         id
        transactionId
        transactionDescription
        timeStamp
        debitAmount
        creditAmount
        balance
      }
    }
  }
}
*/

interface Transactions {
  id: string;
  transactionId: number;
  timeStamp: string;
  transactionDescription: string;
  debitAmount: string;
  creditAmount: string;
  balance: string;
}

export const accountTransactions: QueryResolvers['accountTransactions'] = async function (
  _parent: any,
  {input: {startDate, endDate}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);
    const appId = 'M2S';

    const externalSystem = await getExternalSystem(headers, appId);
    const data = externalSystem.data;
    let systemId = 0;
    (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
      // 👇️ name Tom 0, country Chile 1
      if (data[key].description === 'AMS') {
        systemId = data[key].id;
      }
    });
    const externalRef = await getExternalSystemReference(
      headers,
      systemId,
      appId
    );
    const externalRefData = JSON.parse(externalRef.data[0].data);
    const entityId = externalRefData.groupEntityId;

    if (!entityId) {
      return {
        success: false,
        message: 'Cannot get external ref',
        edges: null,
        totalCount: 0,
      };
    }

    console.log('done with external');
    /*
     * Ams call to get transactions
     * */
    const amsBaseUrl = config.get('amsAddress');
    const merchantAPIApi = new MerchantAPIApi(
      new Configuration({basePath: amsBaseUrl})
    );

    const postData = {
      endDate: endDate.toString(),
      entityId: entityId.toString(),
      startDate: startDate,
    };

    console.log(postData);
    const amsData = await merchantAPIApi
      .merchantTransactionsUsingPOST(postData, headers)
      .then((res) => res.data)
      .catch((_err) => {
        throw Error('Unable to get balance');
      });

    // @ts-ignore
    const transList = amsData.map((list: Transactions) => ({
      cursor: Buffer.from('SalesOrderList:' + list.transactionId).toString(
        'base64'
      ),
      node: {
        id: Buffer.from('SalesOrderList:' + list.transactionId).toString(
          'base64'
        ),
        transactionId: list.transactionId,
        timeStamp: list.timeStamp,
        transactionDescription: list.transactionDescription,
        debitAmount: list.debitAmount,
        creditAmount: list.creditAmount,
        balance: list.balance,
      },
    }));

    return {
      success: true,
      message: 'Success',
      edges: transList,
      totalCount: transList.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
