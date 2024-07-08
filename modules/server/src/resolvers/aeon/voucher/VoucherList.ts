import {aeonConnect} from '../AeonConnect';
import {QueryResolvers} from '../../../generated/graphql';
import {aeonAuth} from '../AeonAuth';
import {Context} from '../../../Context';

/*
query {
    voucherList (input: {type: SupaBets/Hollywood,appId:"T3TSA"}) {
    success
    message
    edges {
      node {
        id
        type
        name
        amount
        categoryId
        productId
      }
      cursor
    }
    totalCount
  }
}
 */

const addVouchers = (data: any, type: string) => {
  const vouchers: any[] = [];

  const cat = data.response.response.data.Manufacturers.Manufacturer;
  for (const voucherType of cat) {
    if (voucherType.name.includes(type)) {
      for (const product of voucherType.Products.Product) {
        const edge = {
          cursor: Buffer.from('Voucher:' + product.name).toString('base64'),
          node: {
            id: Buffer.from('Voucher:' + product.name).toString('base64'),
            type: voucherType.name,
            name: product.name,
            amount: product.value,
            categoryId: product.categoryId,
            productId: product.$t,
          },
        };

        vouchers.push(edge);
      }
    }
  }

  return vouchers;
};

export const voucherList: QueryResolvers['voucherList'] = async function (
  _parent: any,
  {input: {type, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  let vouchers: any = [];
  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {
        success: false,
        message: 'Auth Failed',
        edges: null,
        totalCount: 0,
      };
    }
    data = await aeonConnect(context, authData, 'Voucher', 'VoucherList');
    vouchers = vouchers.concat(addVouchers(data, type));
    return {
      success: true,
      message: data.message,
      edges: vouchers,
      totalCount: vouchers.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
