import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import config from '../../../config';

/*
query {
  stockToReceive {
    totalCount
    edges {
      cursor
      node {
        id
        name
        code
        network
        qty
      }
    }
  }
}
 */

interface StockToReceive {
  id: number;
  product: {
    id: number;
    description: string;
    product_code: string;
    network: {
      name: string;
    };
  };
  qty: number;
  scanned_qty: number;
}

export const stockToReceive: QueryResolvers['stockToReceive'] = async function (
  _parent: any,
  _input: any,
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = config.get('atlasAddress');

    const api = new RepApi(new Configuration({basePath: serverUrl}));
    const stockData = await api
      .listReptransfer(headers)
      .then((res) => res.data);
    const stockList = stockData.data.map((stock: StockToReceive) => ({
      cursor: Buffer.from(
        'StockToReceive:' + stock.id + '_' + stock.product.id
      ).toString('base64'),
      node: {
        id: Buffer.from(
          'StockToReceive:' + stock.id + '_' + stock.product.id
        ).toString('base64'),
        orderId: stock.id,
        productId: stock.product.id,
        name: stock.product.description,
        productCode: stock.product.product_code,
        network: stock.product.network.name,
        qty: stock.qty,
        scannedQty: stock.scanned_qty,
      },
    }));

    return {
      success: stockData.success,
      message: 'Success',
      edges: stockList,
      totalCount: stockList.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
