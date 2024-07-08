import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  receiveStockNew(input:
    {
      barcode: "1606811787",
      appId:""
    }
  ) {
    success
    message
    repTransferId
    productCode
    productName
    transferQty
    receivedQty
    pendingQty
  }
}
*/

export const receiveStockNew: MutationResolvers['receiveStockNew'] = async function (
  _parent: any,
  {input: {barcode, appId}},
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
      .scanStockRepRevised(barcode, headers)
      .then((res) => res.data);

    const {
      status,
      rep_transfer_id,
      product_code,
      product_name,
      transfer_qty,
      received_qty,
      pending_qty,
    } = receiveResult;

    const success = status === 200;
    return {
      success,
      message: 'Stock received!',
      repTransferId: rep_transfer_id,
      productCode: product_code,
      productName: product_name,
      transferQty: transfer_qty,
      receivedQty: received_qty,
      pendingQty: pending_qty,
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
