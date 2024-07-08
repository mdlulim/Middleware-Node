import {StockAPIApi} from '@blts/ams-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {isIterable} from '../../../util';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import config from '../../../config';
import {getExternalSystem} from '../../ams/account/ExternalSystemReference';
import {getExternalSystemReference} from '../customer/ExternalSystemReference';

/*
query {
  productByEntity(input: {appId:"M2s"}) {
    success,
    message,
    totalCount,
    edges {
      cursor
      node {
        id
        description
        manufacturer
        productCode
        retailPrice
        stockTypeId
        tradeValue
      }
    }
  }
}
 */

const createEdge = (product: any, index: number) => {
  return {
    cursor: Buffer.from('ProductByEntity:' + index).toString('base64'),
    node: {
      id: Buffer.from('ProductByEntity:' + index).toString('base64'),
      description: product.description,
      manufacturer: product.manufacturer,
      productCode: product.productCode,
      retailPrice: product.retailPrice,
      stockTypeId: product.stockTypeId,
      tradeValue: product.tradeValue,
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

const getProducts = async function (context: any, machineId: any) {
  try {
    const headers = atlasAuthCheck(context);
    const amsBaseUrl = config.get('amsAddress');
    const api = new StockAPIApi(new Configuration({basePath: amsBaseUrl}));

    console.log(machineId);
    return await api
      .productsUsingGET(machineId, headers)
      .then((res) => res.data);
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

export const productByEntity: QueryResolvers['productByEntity'] = async function (
  _parent: any,
  {input: {appId}},
  context: Context,
  _info: any
) {
  let products: any = [];
  try {
    /**
     * get external ref
     */
    const headers = atlasAuthCheck(context);

    const externalSystem = await getExternalSystem(headers, appId);
    const data = externalSystem.data;
    let systemId = 0;
    (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
      // 👇️ name Tom 0, country Chile 1
      if (data[key].description === 'AMS') {
        systemId = data[key].id;
      }
    });

    const output = await getExternalSystemReference(headers, systemId, appId);

    const externalRefData = JSON.parse(output.data[0].data);

    const machineId = externalRefData.machineId;
    const productData = await getProducts(context, machineId);
    if (!productData) {
      return {
        success: false,
        message: 'Auth Failed',
        edges: null,
        totalCount: 0,
      };
    }
    const prod = productData;
    products = parseProducts(prod);

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
