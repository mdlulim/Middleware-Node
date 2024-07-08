import {VouchersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
Mutation {
  checkVoucherInfo  (input: {barcode: "1606891012",appId:""}) {
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

export const checkVoucherInfo: QueryResolvers['checkVoucherInfo'] = async function (
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
      .boxInfo(barcode, headers)
      .then((res) => {
        console.log(res.data);
        return {
          success: res.data.status,
          message: res.data.Message,
          product: {
            barcode: res.data.data.barcode,
            pod: res.data.data.pod,
            productCode: res.data.data.productCode,
            qty: res.data.data.qty,
            status: res.data.data.status,
          },
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          message: err.response.data.error.message,
          product: {
            barcode: '',
            pod: '',
            productCode: '',
            qty: -1,
            status: '',
          },
        };
      });
  } catch (ex) {
    //@ts-ignore
    return {success: false, message: ex.message, product: null};
  }
};
