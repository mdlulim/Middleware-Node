import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
query {
  salesOrderList (input: {appId:"M2S" }) {
    totalCount
    edges {
     node {
        id
        orderId
        productCode
        productDescription
        qty
        status
      }
    }
  }
}
 */

interface Order {
  id: number;
  product_description: string;
  product_code: string;
  qty: number;
  status_name: string;
  available_order: number;
}

export const salesOrderList: QueryResolvers['salesOrderList'] = async function (
  _parent: any,
  {input: {appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));
    console.log(serverUrl);
    const api = new OrderApi(new Configuration({basePath: serverUrl}));

    const orderData = await api.getSalesOrders(headers).then((res) => res.data);
    console.log(orderData.data);
    const orderList = orderData.data.data.map((order: Order) => ({
      cursor: Buffer.from('SalesOrderList:' + order.id).toString('base64'),
      node: {
        id: Buffer.from('SalesOrderList:' + order.id).toString('base64'),
        orderId: order.id,
        productCode: order.product_code,
        productDescription: order.product_description,
        qty: order.qty,
        statusName: order.status_name,
      },
    }));

    return {
      success: orderData.success,
      message: 'Success',
      edges: orderList,
      totalCount: orderList.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
