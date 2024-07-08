import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
query {
  validateProduct (input: {barcode: "1606891012"}) {
    success
    message
    product {
      product_id
      code
      desc
      qty
    }
  }
}
 */

export const validateProduct: QueryResolvers['validateProduct'] = async function (
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
    return await api
      .scanMobileInvoice(barcode, headers)
      .then((res) => {
        return {
          success: res.data.success,
          message: 'Success',
          product: {
            product_id: res.data.id,
            code: res.data.product_code,
            desc: res.data.description,
            qty: res.data.qty,
            networkId: res.data.network_id,
          },
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.body.error.message,
          product: {
            product_id: -1,
            code: '',
            desc: '',
            qty: -1,
            networkId: -1,
          },
        };
      });
  } catch (e) {
    //@ts-ignore
    return {success: false, message: e.message, product: null};
  }
};
