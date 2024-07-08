import {aeonConnect, aeonConnectSetPrinted} from './AeonConnect';
import {MutationResolvers} from '../../generated/graphql';
import {isIterable} from '../../util';

/*
mutation {
  setPrintedAndTender (input: {
    transRefs: ["73779"]
    tender: {
      cash: 12.00
      change: 0.00
      cheque: 0.00
      creditCard: 0.00
      debitCard: 0.00
      other: 0.00
    }
    userInfo: {deviceId: "29810", serial: "P130188W00987", userPin: "011234", location: "", version: ""}
  }) {
    success
    message
    accounts {
      id
      account
      balance
      profit
    }
  }
}
 */

interface AccountDetail {
  id: number;
  Balance: string;
  RunningProfit: string;
  AccruedProfit: string;
  IssuedProfit: string;
  $t: string;
}

const getAccounts = (data: any) => {
  try {
    if (isIterable(data.response.response.data.Accounts.Account)) {
      return data.response.response.data.Accounts.Account.map(
        (acc: AccountDetail) => ({
          id: acc.id,
          account: acc.$t,
          balance: acc.Balance,
          profit:
            parseFloat(acc.RunningProfit) +
            parseFloat(acc.AccruedProfit) +
            parseFloat(acc.IssuedProfit),
        })
      );
    } else {
      return [
        {
          id: data.response.response.data.Accounts.Account.id,
          account: data.response.response.data.Accounts.Account.$t,
          balance: data.response.response.data.Accounts.Account.Balance,
          profit:
            parseFloat(
              data.response.response.data.Accounts.Account.RunningProfit
            ) +
            parseFloat(
              data.response.response.data.Accounts.Account.AccruedProfit
            ) +
            parseFloat(
              data.response.response.data.Accounts.Account.IssuedProfit
            ),
        },
      ];
    }
  } catch (err) {
    return null;
  }
};

export const setPrintedAndTender: MutationResolvers['setPrintedAndTender'] = async function (
  _parent: any,
  {input: {transRefs, tender, userInfo}},
  context: any,
  _info: any
) {
  try {
    const authData = {
      deviceId: userInfo.deviceId,
      serialNum: userInfo.serial,
      userPin: userInfo.userPin,
      location: userInfo.location,
      swVer: userInfo.version,
    };
    // console.log({authData});

    await aeonConnectSetPrinted(authData, transRefs);

    const total =
      tender.cash +
      tender.creditCard +
      tender.debitCard +
      tender.cheque +
      tender.other -
      tender.change;
    let items = '';
    for (const ref of transRefs) {
      items += '<item>' + ref + '</item>';
    }
    const event =
      '<items>' +
      items +
      '</items>' +
      '<tender cash="' +
      tender.cash +
      '" change="' +
      tender.change +
      '" cheque="' +
      tender.cheque +
      '" creditcard="' +
      tender.creditCard +
      '" debitcard="' +
      tender.debitCard +
      '" other="' +
      tender.other +
      '" total="' +
      total +
      '"/>';

    const tenderResp: any = await aeonConnect(
      context,
      authData,
      'Tender',
      'Tender',
      event
    );
    // console.log({tenderResp});
    // console.log(tenderResp.response.response.data.Accounts.Account);

    return {
      success: true,
      message: tenderResp.message,
      accounts: getAccounts(tenderResp),
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e.message,
      accounts: null,
    };
  }
};
