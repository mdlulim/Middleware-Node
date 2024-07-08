import {QueryResolvers} from '../../generated/graphql';
import {
  NetworkCellC,
  NetworkMtn,
  NetworkTelkomMobile,
  NetworkVodacom,
  NetworkC_Connect,
  NetworkRingas,
  NetworkBlue,
  NetworkHollywood,
  NetworkSupaBets,
} from './NetworkDefinitions';
import {Context} from '../../Context';

/*
query {
  networks (input: {type: "Data" or "Airtime"}) {
    success
    message
    edges {
      node {
        id
        network
      }
      cursor
    }
    totalCount
  }
}
 */

const createNetwork = (network: any, index: number) => {
  return {
    cursor: Buffer.from('Network:' + index).toString('base64'),
    node: {
      id: Buffer.from('Network:' + index).toString('base64'),
      network: network.name,
      colour: network.colour,
      logo: network.logo,
    },
  };
};

export const networks: QueryResolvers['networks'] = async function (
  _parent: any,
  {input: {type}},
  _context: Context,
  _info: any
) {
  const networks: any = [];
  let index = 1;
  if (type.toLowerCase() != 'voucher') {
    networks.push(createNetwork(NetworkC_Connect, index++));
    networks.push(createNetwork(NetworkCellC, index++));
    networks.push(createNetwork(NetworkMtn, index++));
    networks.push(createNetwork(NetworkTelkomMobile, index++));
    networks.push(createNetwork(NetworkVodacom, index++));
  } else {
    networks.push(createNetwork(NetworkBlue, index++));
    networks.push(createNetwork(NetworkRingas, index++));
    networks.push(createNetwork(NetworkHollywood, index++));
    networks.push(createNetwork(NetworkSupaBets, index++));
  }

  return {
    success: true,
    message: 'Success',
    edges: networks,
    totalCount: networks.length,
  };
};
