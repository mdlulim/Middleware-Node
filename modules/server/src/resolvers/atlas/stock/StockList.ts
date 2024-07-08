import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import config from '../../../config';

/*
query {
  stockList {
    totalCount
    edges {
      cursor
      node {
        id
        name
        productCode
        network
        qty
      }
    }
  }
}
 */

interface Stock {
  product_id: number;
  product: {
    description: string;
    product_code: string;
  };
  network: {
    name: string;
  };
  available_stock: number;
}

export const stockList: QueryResolvers['stockList'] = async function (
  _parent: any,
  _input: any,
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = config.get('atlasAddress');

    const api = new RepApi(new Configuration({basePath: serverUrl}));

    const stockData = await api.getRepStock(headers).then((res) => res.data);

    const stockList = stockData.data.map((stock: Stock) => ({
      cursor: Buffer.from('StockList:' + stock.product_id).toString('base64'),
      node: {
        id: Buffer.from('StockList:' + stock.product_id).toString('base64'),
        productId: stock.product_id,
        name: stock.product.description,
        productCode: stock.product.product_code,
        network: stock.network.name,
        qty: stock.available_stock,
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
