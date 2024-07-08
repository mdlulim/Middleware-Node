import {StockApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
mutation{
  checkStockInfo(input: {barcode: "AB92899903",appId:"t3tsa"}) {
    success
    message
    product {
            barcode
            invoiceDate
            productCode
      qty
            status
            network
            warehouse
            custName
            custCode
           ricaStatus
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

export const checkStockInfo: QueryResolvers['checkStockInfo'] = async function (
  _parent: any,
  {input: {barcode, appId}}: Input,
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));

    const api = new StockApi(new Configuration({basePath: serverUrl}));

    return await api
      .stockInfo(barcode, headers)
      .then((res) => {
        console.log(res.data);
        return {
          success: res.data.status,
          message: res.data.Message,
          product: {
            barcode: barcode,
            invoiceDate: res.data.data.invoiceDate,
            productCode: res.data.data.productCode,
            qty: res.data.data.qty,
            status: res.data.data.status,
            network: res.data.data.network,
            warehouse: res.data.data.warehouse,
            custName:
              res.data.data.custName === null ? ' ' : res.data.data.custName,
            custCode:
              res.data.data.custCode === null ? ' ' : res.data.data.custCode,
            ricaStatus:
              res.data.data.ricaStatus === null
                ? ' '
                : res.data.data.ricaStatus,
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
            productCode: '',
            invoiceDate: '',
            qty: -1,
            status: '',
            network: '',
            warehouse: '',
            custName: '',
            custCode: '',
            ricaStatus: '',
          },
        };
      });
  } catch (ex) {
    //@ts-ignore
    return {success: false, message: ex.message, product: null};
  }
};
