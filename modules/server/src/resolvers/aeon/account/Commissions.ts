import {Period, QueryResolvers} from '../../../generated/graphql';
import {aeonAuth} from '../AeonAuth';
import {aeonConnect} from '../AeonConnect';
import {Context} from '../../../Context';

/*
query {
  commissions (input: {period: THREE_DAY,appId:"T3TSA"}){
    totalRetail,
    totalProfit,
    totalCount,
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    },
    edges {
      node {
        id
        retail
        profit
        qty
        name
      }
      cursor
    }
  }
}
 */

const parseCommissions = (lines: any) => {
  const edges: any[] = [];
  let index = 1;

  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  };

  let totalRetail = 0;
  let totalProfit = 0;
  let headerFound = false;
  for (const line of lines) {
    if (line.f === 'B') {
      if (line.$t.includes('XML Interface')) {
        headerFound = true;
      }
    }
    if (headerFound) {
      if (line.f === 'A') {
        const name = line.$t.substring(0, 9).trim();
        const numbers = line.$t.substring(9).trim();

        const split = numbers.split(/[ ]+/);

        if (split.length == 3) {
          const edge = {
            cursor: Buffer.from('Commission:' + index).toString('base64'),
            node: {
              id: Buffer.from('Commission:' + index).toString('base64'),
              retail: parseFloat(split[1]),
              profit: parseFloat(split[2]),
              qty: parseInt(split[0]),
              name: name,
            },
          };
          totalRetail += edge.node.retail;
          totalProfit += edge.node.profit;
          if (index === 1) {
            pageInfo.startCursor = edge.cursor;
          }
          pageInfo.endCursor = edge.cursor;

          edges.push(edge);
          index++;
        }
      }
    }
  }

  return {
    pageInfo: pageInfo,
    totalRetail: Math.round(totalRetail * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
    totalCount: edges.length,
    edges: edges,
  };
};

export const commissions: QueryResolvers['commissions'] = async function (
  _parent: any,
  {input: {period, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  };

  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {
        pageInfo: pageInfo,
        totalRetail: 0,
        totalProfit: 0,
        totalCount: 0,
        edges: null,
      };
    }

    let days = 1;
    if (period === Period.ThreeDay) {
      days = 3;
    } else if (period === Period.OneWeek) {
      days = 7;
    }

    data = await aeonConnect(context, authData, 'Reports', 'AccountList', {});

    const profitEvent = {
      AccId: data.response.response.data.Accounts.Account.id,
      Ref: days,
    };

    data = await aeonConnect(
      context,
      authData,
      'Reports',
      'PrintProfit',
      profitEvent
    );

    return parseCommissions(data.response.response.data.PrintLines.line);
  } catch (e) {
    return {
      pageInfo: pageInfo,
      totalRetail: 0,
      totalProfit: 0,
      totalCount: 0,
      edges: null,
    };
  }
};
