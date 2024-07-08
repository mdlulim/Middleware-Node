import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {isIterable} from '../../../util';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';
import {GetNetworks} from '../../auth/GetNetworks';

/*
query {
  productsByNetwork(input: {network: CellC,appId:"T3TSA"}) {
    success,
    message,
    totalCount,
    edges {
      cursor
      node {
        id
        description
        productCode
        productId
        costPrice
        salePrice
        actExpenseCode
        ogrExpenseCode
        simExpenseCode
      }
    }
  }
}
 */

const createEdge = (product: any, index: number) => {
  return {
    cursor: Buffer.from('ProductByNetwork:' + index).toString('base64'),
    node: {
      id: Buffer.from('ProductByNetwork:' + index).toString('base64'),
      description: product.description,
      productCode: product.product_code,
      productId: product.id,
      costPrice: product.cost_price,
      salePrice: product.sale_price,
      actExpenseCode: product.act_expense_code,
      ogrExpenseCode: product.ogr_expense_code,
      simExpenseCode: product.sim_expense_code,
    },
  };
};

const parseProducts = (data: any) => {
  const products: any[] = [];
  let index = 1;

  if (isIterable(data)) {
    for (const product of data) {
      products.push(createEdge(product, index++));
    }
  } else {
    products.push(createEdge(data, index++));
  }
  return products;
};

const getProducts = async function (
  context: any,
  networkId: number,
  appId: any
) {
  try {
    const headers = atlasAuthCheck(context);

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const api = new OrderApi(new Configuration({basePath: serverUrl}));
    return await api
      .getProductsByNetwork(networkId.toString(), headers)
      .then((res) => res.data);
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

export const productsByNetwork: QueryResolvers['productsByNetwork'] = async function (
  _parent: any,
  {input: {network, appId}},
  context: Context,
  _info: any
) {
  let products: any = [];
  try {
    let myNetwork = network == 'TelkomMobile' ? 'Telkom' : network;
    myNetwork = myNetwork == 'CConnect' ? 'C-Connect' : myNetwork;
    const networkId = await GetNetworks(myNetwork, appId);
    const productData = await getProducts(context, Number(networkId), appId);
    if (!productData) {
      return {
        success: false,
        message: 'Auth Failed',
        edges: null,
        totalCount: 0,
      };
    }
    const prod = productData.data;
    products = parseProducts(prod);
    // console.log(parseProducts(prod))

    return {
      success: true,
      message: 'Success',
      edges: products,
      totalCount: products.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
