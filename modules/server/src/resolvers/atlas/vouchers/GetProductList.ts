import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import {isIterable} from '../../../util';

/*
query {
  productsList{
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
      }
    }
  }
}


*/

const createEdge = (product: any, index: number) => {
  return {
    cursor: Buffer.from('ProductList:' + index).toString('base64'),
    node: {
      id: Buffer.from('ProductList:' + index).toString('base64'),
      description: product.description,
      productCode: product.product_code,
      productId: product.id,
      costPrice: product.cost_price,
      salePrice: product.sale_price,
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

const getProducts = async function (context: any, appId: any) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));
    const api = new OrderApi(new Configuration({basePath: serverUrl}));
    return await api.getProducts(headers).then((res) => res.data);
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

// @ts-ignore
export const productsList: QueryResolvers['productsList'] = async function (
  _parent: any,
  _input: any,
  context: Context,
  _info: any
) {
  let products: any = [];
  try {
    const productData = await getProducts(context, 'M2S');
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
