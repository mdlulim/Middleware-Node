import {RepApi} from '@blts/atlas-api-def';
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
  allocateStock(input: {
    customerId: 8263,
    delivery: Delivery,
    stock: [
    {
      productId: 4,
      qty: 100,
      dealId: 8485,
      salePrice: 2
      barcode: [
        "1234567890",
      ]
    }],
    appId
  }) {
    success
    message
  }
}
*/

export const allocateStock: MutationResolvers['allocateStock'] = async function (
  _parent: any,
  {input: {stock, customer_id, delivery, appId}},
  context: Context,
  _info: any
) {
  try {
    console.log({stock, customer_id, delivery});
    const headers = atlasAuthCheck(context);

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const warehouseId = await getWarehouseId(headers, String(serverUrl));

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

    const data = stock.map((order) => ({
      customer_id: customer_id.toString(),
      warehouse_id: warehouseId.toString(),
      product_id: order.product_id.toString(),
      qty: order.qty.toString(),
      sales_price: order.sale_price.toFixed(2),
      product_deal: order.deal_id.toString(),
      split_deal_id: '0',
      payment_status_id: paymentId.toString(),
      delivery_method_id: deliveryId.toString(),
      barcode: order.barcode,
    }));

    const repApi = new RepApi(new Configuration({basePath: serverUrl}));
    const allocateResult = await repApi
      .createMobileInvoiceOrderBulkAllocation(data, headers)
      .then((res) => res.data)
      .catch((error) => {
        return {
          success: false,
          message: error,
        };
      });

    const success = allocateResult.success;
    return {
      success,
      message: success
        ? 'Success'
        : 'Failed to allocate stock please try again',
    };
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
