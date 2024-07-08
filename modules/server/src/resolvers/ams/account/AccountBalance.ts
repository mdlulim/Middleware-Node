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
  accountBalance {
    success
    message
    balance
    currentBalance
    accountNO
   }
}
 */

export const accountBalance: QueryResolvers['accountBalance'] = async function (
  _parent: any,
  _args: any,
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
    const accountNo = externalRefData.accountNo;
    const entityId = externalRefData.groupEntityId;

    if (!entityId) {
      return {
        success: false,
        message: 'Cannot get external ref',
        balance: 0,
        currentBalance: 0,
        accountNo: 0,
      };
    }
    /*
     * Ams call to get balance
     * */
    const amsBaseUrl = config.get('amsAddress');
    const merchantAPIApi = new MerchantAPIApi(
      new Configuration({basePath: amsBaseUrl})
    );

    const amsData = await merchantAPIApi
      .merchantAvailableBalanceUsingGET(entityId.toString(), headers)
      .then((res) => res.data)
      .catch((_err) => {
        throw Error('Unable to get balance');
      });

    if (!amsData) {
      return {
        success: false,
        message: 'Cannot read balance from AMS',
        balance: 0,
        currentBalance: 0,
        accountNo: 0,
      };
    }

    return {
      success: true,
      message: 'Success',
      balance: Number(amsData.availableBalance),
      currentBalance: Number(amsData.currentBalance),
      accountNo: Number(accountNo),
    };
  } catch (e) {
    return {
      success: false,
      message: 'Failed',
      balance: 0,
      currentBalance: 0,
      accountNo: 0,
    };
  }
};
