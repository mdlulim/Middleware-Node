import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  merchantOrder(input: { order :[
    {
      product_code: "M2S_R5"
      qty:50
    }]
  appId:"M2S"
  }
  ) {
    success
    message
  }
}
*/

export const merchantOrder: MutationResolvers['merchantOrder'] = async function (
  _parent: any,
  {input: {order, appId}},
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

    const data = order.map((order) => ({
      product_code: order.product_code.toString(),
      qty: order.qty,
    }));

    // console.log(data)
    const orderApi = new OrderApi(new Configuration({basePath: serverUrl}));
    const orderResult = await orderApi
      .createRequestOrder(Object(data), headers)
      .then((res) => res.data);

    const success = orderResult.status;
    return {success, message: 'Success'};
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
