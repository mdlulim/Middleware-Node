import {aeonConnect} from '../../AeonConnect';
import {QueryResolvers} from '../../../../generated/graphql';
import {isIterable} from '../../../../util';
import {aeonAuth} from '../../AeonAuth';
import {Context} from '../../../../Context';

/*
query {
  dataBundles (input: {network: CellC}) {
    success
    message
    edges {
      node {
        id
        network
        category
        desc
        amount
        code
      }
      cursor
    }
    totalCount
  }
}
 */

const addBundles = (data: any, network: string) => {
  const bundles: any[] = [];

  if (isIterable(data.response.response.data.ProductList.Category)) {
    for (const category of data.response.response.data.ProductList.Category) {
      const cat = category.type;

      if (isIterable(category.Product)) {
        //Unlikely that Product is NOT iterable - but just in case AEON only has a single bundle allocated...
        for (const product of category.Product) {
          const edge = {
            cursor: Buffer.from('Bundle:' + product.ProductCode).toString(
              'base64'
            ),
            node: {
              id: Buffer.from('Bundle:' + product.ProductCode).toString(
                'base64'
              ),
              network: network,
              category: cat,
              desc: product.Description,
              amount: product.Amount,
              code: product.ProductCode,
            },
          };
          bundles.push(edge);
        }
      }
    }
  } else {
    const cat = data.response.response.data.ProductList.Category;
    for (const product of cat.Product) {
      const edge = {
        cursor: Buffer.from('Bundle:' + product.ProductCode).toString('base64'),
        node: {
          id: Buffer.from('Bundle:' + product.ProductCode).toString('base64'),
          network: network,
          category: cat.type,
          desc: product.Description,
          amount: product.Amount,
          code: product.ProductCode,
        },
      };
      bundles.push(edge);
    }
  }
  return bundles;
};

export const dataBundles: QueryResolvers['dataBundles'] = async function (
  _parent: any,
  {input: {network, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  let bundles: any = [];
  try {
    const bundleName = (network + 'Bundles') as
      | 'MTNBundles'
      | 'TelkomMobileBundles'
      | 'VodacomBundles'
      | 'CellCBundles'
      | 'CCONNECTBundles';

    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {
        success: false,
        message: 'Auth Failed',
        edges: null,
        totalCount: 0,
      };
    }
    data = await aeonConnect(context, authData, bundleName, 'GetProductList');
    bundles = bundles.concat(addBundles(data, network));

    return {
      success: true,
      message: data.message,
      edges: bundles,
      totalCount: bundles.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
