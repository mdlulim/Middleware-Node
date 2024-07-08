import {OrderApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {QueryResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
query {
  productDeals(input: { productId: 4, customerId: 1000,appId:"T3TSA"}) {
    totalCount
    edges {
      cursor
      node {
        id
  			dealId
  			name
  			isTiered
  			tierId
  			ogr
  			act
  			sim
  			isSplit
      }
    }
  }
}
 */

const parseDeals = (data: any) => {
  const deals: any[] = [];
  // console.log(deals)
  deals.push({
    cursor: Buffer.from('Contract:' + data.contract.id).toString('base64'),
    node: {
      id: Buffer.from('Contract:' + data.contract.id).toString('base64'),
      dealId: data.contract.id,
      name: data.contract.name,
      isTiered: data.contract.is_tiered === 1,
      tierId: data.contract.tier_id,
      ogr: data.contract.ogr,
      act: data.contract.act,
      sim: data.contract.sim,
      isSplit: data.contract.is_split === 1,
    },
  });
  for (const deal of data.deals) {
    deals.push({
      cursor: Buffer.from('Deal:' + deal.id).toString('base64'),
      node: {
        id: Buffer.from('Deal:' + deal.id).toString('base64'),
        dealId: deal.id,
        name: deal.name,
        isTiered: deal.is_tiered === 1,
        tierId: deal.tier_id,
        ogr: deal.ogr,
        act: deal.act,
        sim: deal.sim,
        isSplit: deal.is_split === 1,
      },
    });
  }
  console.log(deals);
  return deals;
};

export const productDeals: QueryResolvers['productDeals'] = async function (
  _parent: any,
  {input: {productId, customerId, appId}},
  context: Context,
  _info: any
) {
  let deals: any = [];
  try {
    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const headers = atlasAuthCheck(context);
    const api = new OrderApi(new Configuration({basePath: serverUrl}));
    return await api
      .getProductDeals(productId.toString(), customerId.toString(), headers)
      .then((res) => {
        // console.log(res);
        deals = parseDeals(res.data.data);

        // const perf = deals.data;

        return {
          status: 'Success',
          edges: deals,
          totalCount: deals.length,
        };
      })
      .catch((res) => {
        const noContract = res.body.error.message.includes(
          'The customer does not have any contracts'
        );
        return {
          status: noContract ? 'No Contract' : 'Error',
          edges: deals,
          totalCount: deals.length,
        };
      });
  } catch (e) {
    return {status: 'Error', edges: [], totalCount: 0};
  }
};
