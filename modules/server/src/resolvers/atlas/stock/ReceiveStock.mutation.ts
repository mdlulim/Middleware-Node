import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  receiveStock(input:
    {
      productId: 1
      barcode: "1606811787"
      orderId: 172,
      appId:"T3TSA"
    }
  ) {
    success
    message
    qty
    scannedQty
  }
}
*/

export const receiveStock: MutationResolvers['receiveStock'] = async function (
  _parent: any,
  {input: {productId, barcode, orderId, appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const api = new RepApi(new Configuration({basePath: serverUrl}));
    const receiveResult = await api
      .scanStockRep(productId.toString(), barcode, orderId.toString(), headers)
      .then((res) => res.data);

    const success = receiveResult.success;
    const qty = parseInt(receiveResult.data.qty);
    const scannedQty = parseInt(receiveResult.data.scanned_qty);
    return {success, message: 'Success', qty, scannedQty};
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message, qty: null, scannedQty: null};
  }
};
