import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  validateBatch (input: {barcode: "1606891012"},appId) {
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

interface Input {
  input: {
    barcode: string;
    appId: any;
  };
}

export const validateBatch: MutationResolvers['validateBatch'] = async function (
  _parent: any,

  {input: {barcode, appId}}: Input,

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
        console.log(res.data);
        return {
          success: res.data.success,
          message: 'Success',
          product: {
            product_id: res.data.data.id,
            code: res.data.data.product_code,
            desc: res.data.data.description,
            qty: res.data.data.qty,
            networkId: res.data.data.network_id,
          },
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          message: err.response.data.error.message,
          product: {
            product_id: -1,
            code: '',
            desc: '',
            qty: -1,
            networkId: -1,
          },
        };
      });
  } catch (ex) {
    //@ts-ignore
    return {success: false, message: ex.message, product: null};
  }
};
