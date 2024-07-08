import {UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
query  {
  customerListNew (input: { appId:"T3TSA"}){
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

const getCustomers = async function (context: Context, appId: any) {
  try {
    const headers = atlasAuthCheck(context);

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }
    const api = new UserApi(new Configuration({basePath: serverUrl}));
    return await api.getUserCustomers(headers).then((res) => res.data);
  } catch (ex) {
    // console.log(ex);
    return false;
  }
};

export const customerListNew: QueryResolvers['customerListNew'] = async function (
  _parent: any,
  {input: {appId}},
  context: Context,
  _info: any
) {
  try {
    const customerData = await getCustomers(context, appId);
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
