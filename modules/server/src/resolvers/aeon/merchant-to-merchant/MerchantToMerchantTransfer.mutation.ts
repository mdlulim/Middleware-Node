import {MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {aeonAuth} from '../AeonAuth';
import {aeonConnectMerchantToTransfer} from '../AeonConnect';
import {isIterable} from '../../../util';
import {sendSms} from '../../cellfind/SendSms';

const buildSmsMessage = (data: any, sender: string) => {
  let sms = '';
  if (isIterable(data.data.ConfirmPaymentResponse)) {
    for (const response of data.data) {
      sms += 'Payment Received ' + '\n';
      sms += 'From : ' + sender + '\n';
      sms += 'Amount: R ' + response.AmountRequested + '\n';
      sms += 'Transaction Ref: ' + response.TransID + '\n';
      sms += 'Date: ' + response.DateTime;
    }
  } else {
    const response = data.data.ConfirmPaymentResponse;
    sms += 'Payment Received ' + '\n';
    sms += 'From : ' + sender + '\n';
    sms += 'Amount: R ' + response.AmountRequested + '\n';
    sms += 'Transaction Ref: ' + response.TransID + '\n';
    sms += 'Date: ' + response.DateTime;
  }

  return sms.trim();
};

/*
Mutation {
  merchantToMerchantTransfer(input: {accountNo: "BYD35435", amount: "20", appId: "T3TSA",cellNumber:"0726571338"}) {
    success
    message
 }
}
*/

export const merchantToMerchantTransfer: MutationResolvers['merchantToMerchantTransfer'] = async function (
  _parent: any,
  {input: {accountNo, amount, cellNumber, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  if (Number(amount) < 50 || Number(amount) > 10000) {
    return {success: false, message: 'Please Enter Amount R50 - R10 000'};
  }
  const event = {
    accountNo: accountNo,
    amount: amount,
  };

  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {
        success: false,
        message: 'Auth Failed',
      };
    }

    data = await aeonConnectMerchantToTransfer(context, authData, event);
    const sms = buildSmsMessage(data.response.response, authData.account);

    if (false) {
      return {success: true, message: data.message};
    } else {
      try {
        await sendSms(cellNumber, sms);
      } catch (e) {}
      return {success: true, message: data.message};
    }
  } catch (e) {
    return {success: false, message: e.message};
  }
};
