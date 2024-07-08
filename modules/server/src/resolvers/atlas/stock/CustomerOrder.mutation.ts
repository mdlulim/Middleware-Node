import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {
  atlasAuthCheck,
  getDeliveryModeId,
  getPaymentModeId,
  getWarehouseId,
} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  repTransfer(input: { transfer :[
    {
      productId: "8"
      qty: "1"
    }
  ]}) {
    success
    message
  }
}
*/

export const customerOrder: MutationResolvers['customerOrder'] = async function (
  _parent: any,
  {input: {order, customerId, delivery, appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);
    //console.log(headers)

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const warehouseId = await getWarehouseId(headers, String(serverUrl));
    // console.log(warehouseId)

    const deliveryId = await getDeliveryModeId(
      headers,
      delivery,
      String(serverUrl)
    );

    const paymentId = await getPaymentModeId(
      headers,
      'Unpaid',
      String(serverUrl)
    );

    const data = order.map((order) => ({
      customer_id: customerId.toString(),
      warehouse_id: warehouseId.toString(),
      product_id: order.productId.toString(),
      qty: order.qty.toString(),
      sales_price: order.salePrice.toFixed(2),
      product_deal: order.dealId.toString(),
      split_deal_id: '0',
      payment_status_id: paymentId.toString(),
      delivery_method_id: deliveryId.toString(),
    }));

    // console.log(data)
    const orderApi = new OrderApi(new Configuration({basePath: serverUrl}));
    const orderResult = await orderApi
      .createSalesOrder(data, headers)
      .then((res) => res.data);

    const success = orderResult.success;
    return {success, message: 'Success'};
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
