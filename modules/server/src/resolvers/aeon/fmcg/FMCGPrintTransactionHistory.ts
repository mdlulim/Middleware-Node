import {
  QueryResolvers,
  BusAccount,
  ReprintReceiptInput,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {Context} from '../../../Context';
import {getPrintJob} from '../../../aeonutiils';

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

interface Input {
  input: ReprintReceiptInput;
  auth: BusAccount;
}

export const fmcgPrintTransactionHistory: QueryResolvers['fmcgPrintTransactionHistory'] = async function (
  _parent: any,
  {input: {transId, userReprint}, auth}: Input,
  context: Context,
  _info: any
) {
  let data: any = {};

  try {
    if (!auth) {
      return {
        printLines: null,
      };
    }

    const event = {
      TransId: transId,
      userReprint: userReprint,
    };

    data = await aeonConnect(context, auth, 'Reprint', 'Reprint', event);

    // @ts-ignore
    const rawData = data.response.response.data.Reprint.line;

    return {
      printLines: JSON.stringify(getPrintJob(rawData)),
    };
  } catch (e) {
    return {
      printLines: null,
    };
  }
};
