import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  addProductDeal(input: {productId: 4, customerId:4000, name:"MPKTest", ogr:1, act:2, sim:3,appId:"t3tsa"}) {
    success
    message
  }
}
*/

export const addProductDeal: MutationResolvers['addProductDeal'] = async function (
  _parent: any,
  {input: {productId, customerId, name, ogr, act, sim, appId}},
  context: Context,
  _info: any
) {
  try {
    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const headers = atlasAuthCheck(context);
    const api = new OrderApi(new Configuration({basePath: serverUrl}));
    const startDate = new Date().toISOString().split('T')[0];

    const dealResult = await api
      .changeCustomerDeal(
        productId.toString(),
        customerId.toString(),
        name,
        startDate,
        '2099-12-31',
        ogr.toFixed(2),
        act.toFixed(2),
        sim.toFixed(2),
        headers
      )
      .then((res) => res.data);

    const success = dealResult.success;
    return {success, message: 'Success'};
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.response.data.error.message};
  }
};
