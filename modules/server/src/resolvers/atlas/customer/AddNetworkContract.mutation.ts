import {CustomersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';
import {GetNetworks} from '../../auth/GetNetworks';

/*
mutation {
  addNetworkContract(input: {network: MTN, customerId:4000, name:"MPKTest", ogr:1, act:2, sim:3,appId:"T3TSA"}) {
    success
    message
  }
}
*/

export const addNetworkContract: MutationResolvers['addNetworkContract'] = async function (
  _parent: any,
  {input: {name, customerId, network, isTiered, isSplit, ogr, act, sim, appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    let serverurl = config.get('atlasAddress');
    if (appId) {
      serverurl = String(await getTenant(appId));
    }

    let myNetwork = network == 'TelkomMobile' ? 'Telkom' : network;
    myNetwork = myNetwork == 'CConnect' ? 'C-Connect' : myNetwork;
    const networkId = await GetNetworks(myNetwork, appId);
    const api = new CustomersApi(new Configuration({basePath: serverurl}));
    const contractResult = await api
      .rep(
        name,
        customerId.toString(),
        String(networkId).toString(),
        isTiered || false,
        isSplit || false,
        ogr.toFixed(2),
        act,
        sim,
        headers
      )
      .then((res) => res.data);

    const success = contractResult.success;
    return {success, message: 'Success'};
  } catch (ex) {
    console.log(ex.response);
    return {success: false, message: ex.response.data.error.message};
  }
};
