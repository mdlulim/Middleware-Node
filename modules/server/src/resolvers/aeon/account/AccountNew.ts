import {QueryResolvers} from '../../../generated/graphql';
import {aeonAuth} from '../AeonAuth';
import {aeonConnectSingle} from '../AeonConnect';
import {Context} from '../../../Context';

/*
query {
  account {
    balance,
    profit,
    accountNumber
  }
}
 */

export const accountNew: QueryResolvers['accountNew'] = async function (
  _parent: any,
  //ts-ignore
  {input: {appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  try {
    const authData = await aeonAuth(context, appId);

    if (!authData) {
      return {
        balance: 0,
        profit: 0,
        accountNumber: '',
      };
    }

    data = await aeonConnectSingle(authData, 'ProfitDisplay', '');

    const balance = parseFloat(data.response.response.Accounts.Account.Balance);
    const runningProfit = parseFloat(
      data.response.response.Accounts.Account.RunningProfit
    );
    const accruedProfit = parseFloat(
      data.response.response.Accounts.Account.AccruedProfit
    );
    const issuedProfit = parseFloat(
      data.response.response.Accounts.Account.IssuedProfit
    );

    return {
      balance: balance,
      profit: ((runningProfit + accruedProfit + issuedProfit) * 100) / 100,
      accountNumber: authData.account,
    };
  } catch (e) {
    return {
      balance: 0,
      profit: 0,
      accountNumber: '',
    };
  }
};
