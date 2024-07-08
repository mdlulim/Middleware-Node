import {VouchersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
query {
  validateBox (input: {barcode: "1606891012"},appId) {
    success
    message
    product {
      product_id
      code
      desc
      qty
      stockTypeId
      tradeValue
      retailPrice

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

export const validateBox: QueryResolvers['validateBox'] = async function (
  _parent: any,
  {input: {barcode, appId}}: Input,
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));

    const api = new VouchersApi(new Configuration({basePath: serverUrl}));

    return await api
      .validateMerchantBox(barcode, headers)
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
            tradeValue:
              res.data.data.tradeValue === null ? 0 : res.data.data.tradeValue,
            retailPrice:
              res.data.data.retailPrice === null
                ? 0
                : res.data.data.retailPrice,
            stockTypeId:
              res.data.data.stockTypeId === null
                ? 0
                : res.data.data.stockTypeId,
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
            tradeValue: -1,
            retailPrice: -1,
            stockTypeId: -1,
          },
        };
      });
  } catch (ex) {
    //@ts-ignore
    return {success: false, message: ex.message, product: null};
  }
};
