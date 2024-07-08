import {MerchantApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
query {
  activationHistory {
    totalCount
    edges {
      cursor
      node {
        box
        price
      }
    }
  }
}
 */

interface Input {
  input: {
    invoiceNo: string;
    appId: string;
  };
}

interface Box {
  serial_no: string;
  price: string;
}

export const activationHistory: QueryResolvers['activationHistory'] = async function (
  _parent: any,
  {input: {invoiceNo, appId}}: Input,
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));

    const api = new MerchantApi(new Configuration({basePath: serverUrl}));

    const activationData = await api
      .getTransactionHistory(invoiceNo, headers)
      .then((res) => res.data);
    if (!activationData) {
      return {
        success: false,
        message: 'Auth Failed',
        edges: null,
        totalCount: 0,
      };
    }

    const prod = activationData.data.data.map((box: Box) => ({
      cursor: Buffer.from('BoxList:').toString('base64'),
      node: {
        id: Buffer.from('BoxList:').toString('base64'),
        box: box.serial_no,
        price: box.price,
      },
    }));

    return {
      success: true,
      message: 'Success',
      edges: prod,
      totalCount: prod.length,
    };
  } catch (ex) {
    return {success: false, message: ex.message, edges: null, totalCount: 0};
  }
};
