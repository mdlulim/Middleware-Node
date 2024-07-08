import {VouchersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
mutation {
  verifyStockReceived(input:
    {
      barcode: "1606811787",
      appId:"M2S"
    }
  ) {
    success
    message
 }
}
*/

export const verifyStockReceived: MutationResolvers['verifyStockReceived'] = async function (
  _parent: any,
  {input: {barcode, appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));

    const api = new VouchersApi(new Configuration({basePath: serverUrl}));
    const receiveResult = await api
      .verifyStockReceived(barcode, headers)
      .then((res) => res.data);

    const {status} = receiveResult;

    const success = status === 200;
    return {
      success,
      message: 'Stock received!',
    };
  } catch (ex) {
    console.log(ex.response.data);
    return {
      success: false,
      message: ex.response.data.error.message
        ? ex.response.data.error.message
        : 'Box is already scanned/invalid.',
      repTransferId: null,
      productCode: '',
      productName: '',
      transferQty: null,
      receivedQty: null,
      pendingQty: null,
    };
  }
};
