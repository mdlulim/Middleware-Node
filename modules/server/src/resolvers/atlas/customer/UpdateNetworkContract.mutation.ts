import axios from 'axios';
import {MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import {GetNetworks} from '../../auth/GetNetworks';

/*
mutation {
  updateNetworkContract(input: {network: MTN, customerId:4000, ogr:1, act:2, sim:3,appId:"T3TSA"}) {
    success
    message
  }
}
*/

export const updateNetworkContract: MutationResolvers['updateNetworkContract'] = async function (
  _parent: any,
  {input: {customerId, network, isTiered, isSplit, ogr, act, sim, appId}},
  context: Context,
  _info: any
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;
    let myNetwork = network == 'TelkomMobile' ? 'Telkom' : network;
    myNetwork = myNetwork == 'CConnect' ? 'C-Connect' : myNetwork;
    const networkId = await GetNetworks(myNetwork, appId);

    const serverUrl = String(await getTenant(appId));
    const uri = `${serverUrl}/api/v1/customer/update_contract`;
    const config = {
      method: 'PUT',
      url: uri,
      headers: {
        Accept: 'application/json',
        Authorization: `${authToken}`,
      },
      params: {
        customer_id: customerId,
        network_id: networkId,
        is_tiered: isTiered,
        is_split: isSplit,
        ogr: ogr,
        act: act,
        sim: sim,
      },
      maxBodyLength: Infinity,
    };

    const contractResult = await axios
      // @ts-ignore
      .request(config)
      .then((response) => {
        //console.log(response);
        return response.data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error,
        };
      });

    if (!contractResult) {
      return {
        success: false,
        message: 'Failed to update customer contract',
      };
    }

    const result = {
      success: true,
      message: 'Success',
    };

    return result;
  } catch (ex) {
    // on any errors, do not return profile
    return {
      success: false,
      message: 'Not Found',
    };
  }
};
