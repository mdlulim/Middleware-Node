import {UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../../config';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';

/*
query {
  customerList {
    totalCount
    edges {
      cursor
      node {
        id
        name
        customerCode
        customerId
      }
    }
  }
}
 */

interface Customer {
  id: number;
  cust_code: string;
  name: string;
}

const getCustomers = async function (context: Context) {
  try {
    const headers = atlasAuthCheck(context);
    const api = new UserApi(
      new Configuration({basePath: config.get('atlasAddress')})
    );
    return await api.getUserCustomers(headers).then((res) => res.data);
  } catch (ex) {
    // console.log(ex);
    return false;
  }
};

export const customerList: QueryResolvers['customerList'] = async function (
  _parent: any,
  _input: any,
  context: Context,
  _info: any
) {
  try {
    const customerData = await getCustomers(context);
    // console.log(customerData);
    if (!customerData) {
      return {
        success: true,
        message: 'Success',
        edges: null,
        totalCount: 0,
      };
    }
    const customers = customerData.data.map((customer: Customer) => ({
      cursor: Buffer.from('Customer:' + customer.id).toString('base64'),
      node: {
        id: Buffer.from('Customer:' + customer.id).toString('base64'),
        name: customer.name,
        customerCode: customer.cust_code,
        customerId: customer.id,
      },
    }));

    // console.log(customers);

    return {
      success: true,
      message: 'Success',
      edges: customers,
      totalCount: customers.length,
    };
  } catch (e) {
    return {success: false, message: e.message, edges: null, totalCount: 0};
  }
};
