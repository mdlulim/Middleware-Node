import {aeonConnect} from '../../AeonConnect';
import {QueryResolvers} from '../../../../generated/graphql';
import {isIterable} from '../../../../util';
import {aeonAuth} from '../../AeonAuth';
import {Context} from '../../../../Context';

/*
query {
  dataBundlesNetwork {
    success
    message
    cellc {
      category
      desc
      amount
      code
    }
    mtn {
      category
      desc
      amount
      code
    }
    telkom {
      category
      desc
      amount
      code
    }
    vodacom {
      category
      desc
      amount
      code
    }
  }
}
 */

const addBundles = (data: any) => {
  const bundles: any[] = [];
  if (isIterable(data.response.response.data.ProductList.Category)) {
    for (const category of data.response.response.data.ProductList.Category) {
      const cat = category.type;
      for (const product of category.Product) {
        const bundle = {
          category: cat,
          desc: product.Description,
          amount: product.Amount,
          code: product.ProductCode,
        };
        bundles.push(bundle);
      }
    }
  } else {
    const cat = data.response.response.data.ProductList.Category;
    for (const product of cat.Product) {
      const bundle = {
        category: cat.type,
        desc: product.Description,
        amount: product.Amount,
        code: product.ProductCode,
      };
      bundles.push(bundle);
    }
  }
  return bundles;
};
//@ts-ignore
export const dataBundlesNetwork: QueryResolvers['DataBundlesNetwork'] = async function (
  _parent: any,

  //@ts-ignore
  {input: {appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  let cellc: any = [];
  let mtn: any = [];
  let telkom: any = [];
  let vodacom: any = [];
  let cconnect: any = [];

  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return null;
    }
    data = await aeonConnect(
      context,
      authData,
      'CellCBundles',
      'GetProductList'
    );
    cellc = addBundles(data);

    data = await aeonConnect(context, authData, 'MTNBundles', 'GetProductList');
    mtn = addBundles(data);

    data = await aeonConnect(
      context,
      authData,
      'TelkomMobileBundles',
      'GetProductList'
    );
    telkom = addBundles(data);

    data = await aeonConnect(
      context,
      authData,
      'VodacomBundles',
      'GetProductList'
    );
    vodacom = addBundles(data);

    data = await aeonConnect(
      context,
      // @ts-ignore
      aeonData,
      'CCONNECTBundles',
      'GetProductList'
    );
    cconnect = addBundles(data);

    return {
      success: true,
      message: data.message,
      cellc: cellc,
      mtn: mtn,
      telkom: telkom,
      vodacom: vodacom,
      cconnect: cconnect,
    };
  } catch (e) {
    return {success: false, message: e.message, bundles: []};
  }
};
