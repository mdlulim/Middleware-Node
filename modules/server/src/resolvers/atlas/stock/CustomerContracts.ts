import axios from 'axios';
import {QueryResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import {GetNetworks} from '../../auth/GetNetworks';

/**
query  {
  customerContracts (input: { appId:"T3TSA", customerId:1234, network: "CellC"}){
     success
     message
     data{
        id
        customer_id
        name
        is_tiered
        tier_id
        ogr
        act
        sim
        network_id
        is_split
      }
  }
}
* @param _parent
* @param appId
* @param customerId
 * @param network
* @param context
*/
// @ts-ignore
export const customerContracts: QueryResolvers['customerContracts'] = async function (
  _parent: any,
  {input: {appId, customerId, network}},
  context: Context
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;
    const serverUrl = String(await getTenant(appId));
    const uri = `${serverUrl}/api/v1/order/contract`;

    let myNetwork = network == 'TelkomMobile' ? 'Telkom' : network;
    myNetwork = myNetwork == 'CConnect' ? 'C-Connect' : myNetwork;
    const networkId = await GetNetworks(myNetwork, appId);

    const config = {
      method: 'get',
      url: uri,
      headers: {
        Accept: 'application/json',
        Authorization: `${authToken}`,
      },
      params: {
        customer_id: customerId,
        network_id: networkId,
      },
      maxBodyLength: Infinity,
    };

    const output = await axios
      // @ts-ignore
      .request(config)
      .then((response) => {
        console.log('response', response.data);
        return response.data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error,
        };
      });
    if (!output) {
      return null;
    }

    const contracts = output.data;
    const result = {
      success: true,
      message: 'Success',
      data: contracts,
    };

    return result;
  } catch (ex) {
    // on any errors, do not return profile
    return {
      success: false,
      message: 'Not Found',
      data: null,
    };
  }
};
