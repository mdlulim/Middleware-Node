import {Period, QueryResolvers} from '../../../generated/graphql';
import {aeonAuth} from '../AeonAuth';
import {aeonConnect} from '../AeonConnect';
import {Context} from '../../../Context';

/*
query {
  transactions (input: {period: ONE_WEEK}){
    totalAmount,
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
        amount
        name
        description
      }
      cursor
    }
  }
}
 */

const parseTransactions = (lines: any) => {
  const edges: any[] = [];
  let index = 1;
  let date = '';
  const dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;

  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  };

  let totalAmt = 0;

  for (const line of lines) {
    if (line.f === 'E') {
      if (line.$t.match(dateReg)) {
        date = line.$t;
      }
    } else if (line.f === 'A') {
      const split = line.$t.split(/[ ]+/);
      if ((split.length == 3 || split.length == 5) && split[0].includes(':')) {
        const amount =
          split.length == 5 ? parseFloat(split[4]) : parseFloat(split[2]);
        const name =
          split.length == 5 ? split[1] + split[2] + split[3] : split[1];
        const edge = {
          cursor: Buffer.from('Transaction:' + index).toString('base64'),
          node: {
            id: Buffer.from('Transaction:' + index).toString('base64'),
            amount: amount,
            name: name,
            description:
              date + ' ' + split[0].substring(split[0].indexOf(':') - 2),
          },
        };

        totalAmt += edge.node.amount;

        if (index === 1) {
          pageInfo.startCursor = edge.cursor;
        }

        pageInfo.endCursor = edge.cursor;

        edges.push(edge);
        index++;
      }
    }
  }

  return {
    pageInfo: pageInfo,
    totalAmount: Math.round(totalAmt * 100) / 100,
    totalCount: edges.length,
    edges: edges,
  };
};

export const transactions: QueryResolvers['transactions'] = async function (
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
        totalAmount: 0,
        totalCount: 0,
        edges: null,
      };
    }

    let days = 1;
    if (period === Period.ThreeDay) {
      days = 3;
    } else if (period === Period.OneWeek) {
      days = 7;
    } else if (period === Period.Month) {
      days = 30;
    }

    const event = {
      Ref: days,
    };

    data = await aeonConnect(context, authData, 'Reports', 'TransList', event);

    return parseTransactions(data.response.response.data.PrintLines.line);
  } catch (e) {
    return {
      pageInfo: pageInfo,
      totalAmount: 0,
      totalCount: 0,
      edges: null,
    };
  }
};
