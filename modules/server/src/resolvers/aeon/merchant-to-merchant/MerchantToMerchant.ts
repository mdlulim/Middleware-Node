import {QueryResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {aeonAuth} from '../AeonAuth';
import {aeonConnectMerchantToMerchant} from '../AeonConnect';

/*

query {
  merchantToMerchant(input: {accountNo: "BYD35435", amount: "20", appId: "T3TSA"}) {
    success
    message
    accountInfo{
       TotalAmount
      TransRef
      ConvenienceFee
      TransfereeAccount
      TransfereeName
    }
  }
}
*/

export const merchantToMerchant: QueryResolvers['merchantToMerchant'] = async function (
  _parent: any,
  {input: {accountNo, amount, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};

  if (Number(amount) < 50 || Number(amount) > 10000) {
    return {
      success: false,
      message: 'Please Enter Amount R50 - R10 000',
      accountInfo: null,
    };
  }
  const event = {
    accountNo: accountNo,
    amount: amount,
  };
  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {success: false, message: 'Auth Failed', accountInfo: null};
    }

    data = await aeonConnectMerchantToMerchant(context, authData, event);
    const res = data.response.response.data;
    const result = {
      TotalAmount: res.TotalAmount,
      TransRef: res.TransRef,
      ConvenienceFee: res.ConvenienceFee,
      TransfereeAccount: res.TransfereeAccount,
      TransfereeName: res.TransfereeName,
    };
    return {success: true, message: data.message, accountInfo: result};
  } catch (e) {
    return {success: false, message: e.message, accountInfo: null};
  }
  return {success: true, message: 'test', accountInfo: null};
};
