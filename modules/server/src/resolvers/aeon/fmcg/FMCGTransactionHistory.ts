import {
  QueryResolvers,
  BusAccount,
  ReprintInput,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

/*
query {
  fmcgTransactionHistory(
  input: {
    startDate: "1625122920000",
    endDate: "1627974190453",
    },
    auth: {
      deviceId: "100000012",
      serialNum: "58961D96768E",
      userPin: "011234",
      location: "",
      swVer: ""
    }) {

    edges {
      node{
        id
        amount
        ref
        type
        date

      }
    }



    }
}
 */

interface Input {
  input: ReprintInput;
  auth: BusAccount;
}

interface Reprint {
  id: string;
  amount: string;
  ref: string;
  type: string;
  date: string;
}

export const fmcgTransactionHistory: QueryResolvers['fmcgTransactionHistory'] = async function (
  _parent: any,
  {input: {startDate, endDate}, auth}: Input,
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
    if (!auth) {
      return {
        totalCount: 0,
        edges: [],
        pageInfo: pageInfo,
      };
    }

    const event = {
      endDate: endDate,
      startDate: startDate,
    };

    data = await aeonConnect(context, auth, 'Reprint', 'ListByDate', event);

    // @ts-ignore
    let rawData = data.response.response.data.reprints.reprint;

    if (!isIterable(rawData)) {
      rawData = [rawData];
    }
    console.log(rawData);

    rawData = rawData.filter((raw: Reprint) => {
      return raw.type.includes('Supplier Payment');
    });

    const reprintOutput = rawData.map((reprint: Reprint) => {
      return {
        cursor: reprint.id,
        node: {
          id: reprint.id,
          amount: reprint.amount,
          ref: reprint.ref,
          type: reprint.type,
          date: reprint.date,
        },
      };
    });

    return {
      edges: reprintOutput,
      totalCount: reprintOutput.length,
      pageInfo: pageInfo,
    };
  } catch (e) {
    return {
      totalCount: 0,
      edges: [],
      pageInfo: pageInfo,
    };
  }
};
