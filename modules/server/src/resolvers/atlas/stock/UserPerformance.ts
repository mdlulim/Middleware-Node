import {ReportsApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';
import {GetNetworks} from '../../auth/GetNetworks';

/*
query {
 userPerformance (input: {type:"Agent",  network: MTN, customerId: 980, date: "2020-10-01"}) {
  success
  totalActivations
  totalConnections
  totalStock
  totalTranfer
  totalSold
}
}

rep 
query {
 userPerformance (input: {type:"Rep",  network: Vodacom, customerId: 973, date: "2021-09-01"}) {
  success
  message
  totalActivations
  totalConnections
  totalStock
  totalTranfer
  totalSold
}
}
 */

const getPerformances = async function (
  context: Context,
  type: string,
  customerId: number,
  networkId: number,
  date: string,
  appId: any
) {
  try {
    const headers = atlasAuthCheck(context);

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }
    const api = new ReportsApi(new Configuration({basePath: serverUrl}));

    //console.log("values", "type=" + type, "customer_id=" + customerId, "network_id=" + networkId, "date=" + date)

    return await api
      .userPerfomance(type, customerId, networkId, date, headers)
      .then((res) => res.data);
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

interface Input {
  input: {
    type: string;
    network: 'MTN' | 'Vodacom' | 'CellC' | 'IPay';
    customerId: string;
    date: string;
    appId: string;
  };
}

//@ts-ignore
export const userPerformance: QueryResolvers['userPerformance'] = async function (
  _parent: any,
  {input: {type, network, customerId, date, appId}}: Input,
  context: Context,
  _info: any
) {
  try {
    //@ts-ignore
    let myNetwork = network == 'TelkomMobile' ? 'Telkom' : network;
    myNetwork = myNetwork == 'CConnect' ? 'C-Connect' : myNetwork;
    const networkId = await GetNetworks(myNetwork, appId);

    const userPerformance = await getPerformances(
      context,
      //@ts-ignore
      type,
      //@ts-ignore
      customerId,
      networkId,
      date,
      appId
    );

    ///console.log(userPerformance)
    const perf = userPerformance.data;
    console.log(perf);
    if (!perf) {
      return {
        success: false,
        message: 'Auth Failed',
        totalActivations: 0,
        totalConnections: 0,
        totalStock: 0,
        totalTranfer: 0,
        totalSold: 0,
      };
    }
    let activation = 0,
      connections = 0,
      stock = 0,
      sold = 0,
      tranfer = 0;

    if (perf.act[0]) {
      activation = perf.act[0].total_activations;
    }

    if (perf.conn[0]) {
      connections = perf.conn[0].total_connections;
    }

    if (perf.stock[0]) {
      stock = perf.stock[0].total_sales;
    }

    if (perf.tranfer[0]) {
      tranfer = perf.tranfer[0].total_sales;
    }

    if (perf.sold[0]) {
      sold = perf.sold[0].total_sales;
    }

    return {
      success: true,
      message: 'Success',

      totalActivations: activation,
      totalConnections: connections,
      totalStock: stock,
      totalTranfer: tranfer,
      totalSold: sold,
    };
  } catch (ex) {
    console.log(ex);
    return {
      success: false,
      message: 'Auth Failed1',
      totalActivations: 0,
      totalConnections: 0,
      totalStock: 0,
      totalTranfer: 0,
      totalSold: 0,
    };
  }
};
