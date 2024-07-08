import {SystemApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {getTenant} from './tenant';

export async function GetNetworks(network: any, appId: any) {
  try {
    const serverUrl = String(await getTenant(appId));

    const api = new SystemApi(new Configuration({basePath: serverUrl}));
    const results = await api.getNetworks();
    const networks = results.data.data;

    const networkOBJ = await networks.filter(function (item: any) {
      return item.name.toLowerCase() == network.toLowerCase();
    });
    return networkOBJ[0].id ? Number(networkOBJ[0].id) : 0;
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
}
