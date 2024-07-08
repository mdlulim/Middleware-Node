import {aeonConnectAirtimeVoucher} from '../AeonConnect';
import {MutationResolvers} from '../../../generated/graphql';
import {sendSms} from '../../cellfind/SendSms';
import {aeonAuth} from '../AeonAuth';
import {Context} from '../../../Context';
import {isIterable} from '../../../util';

/*
mutation {
  vouchersTopUp(input: {productId:799 , qty:1, cellNumber: "0726571338",voucherType:Ringas,appId:"T3TSA"}) {
    success
    message
  }
}
 */
const Instructions = (voucherType: string) => {
  /**
   * redemption instructions
   */
  let instruction = '';
  switch (voucherType) {
    case 'Hollywood Bet':
      instruction =
        'Recharge/Loading instructions: Redeem this voucher by logging onto www.hollywoodbets.mobi';
      break;
    case 'SupaBets':
      instruction =
        'Redeem this voucher by logging on to: www.supabets.co.za and follow the instructions';
      break;
    case 'BluVoucher':
      instruction =
        'Blu Voucher: For redemption partners, please visit www.bluvoucher.co.za';
      break;
    case 'Ringas':
      instruction = 'TO RECHARGE DIAL: *130*888*PIN#';
      break;
  }
  return instruction;
};

const buildSmsMessage = (data: any, voucherType: string) => {
  let sms = '';
  let date = '';
  voucherType = voucherType === 'Hollywood' ? 'Hollywood Bet' : voucherType;
  sms +=
    voucherType === 'BluVoucher'
      ? voucherType + '(s)\n'
      : voucherType + ' Voucher(s)\n';
  sms += '\n';

  if (isIterable(data.data.Voucher)) {
    for (const voucher of data.data.Voucher) {
      sms += 'PIN: ' + voucher.PIN + '\n';
      sms += 'Amount: R ' + voucher.Amount + '\n';
      sms += 'Serial: ' + voucher.Serial + '\n';
      sms += 'Ref: ' + voucher.TransRef + '\n';
      sms += '\n';
      date = 'Date: ' + voucher.Date;
    }
  } else {
    const voucher = data.data.Voucher;
    sms += 'PIN: ' + voucher.PIN + '\n';
    sms += 'Amount: R ' + voucher.Amount + '\n';
    sms += 'Serial: ' + voucher.Serial + '\n';
    sms += 'Ref: ' + voucher.TransRef + '\n';
    sms += '\n';
    date = 'Date: ' + voucher.Date;
  }
  sms += date + '\n';
  sms += '\n';
  sms += Instructions(voucherType);

  return sms.trim();
};

export const vouchersTopUp: MutationResolvers['vouchersTopUp'] = async function (
  _parent: any,
  {input: {qty, productId, cellNumber, voucherType, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};

  if (qty > 10) {
    return {success: false, message: 'Only 10 vouchers allowed'};
  }
  const event = {
    ProductId: productId,
    Quantity: qty,
  };

  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return null;
    }

    data = await aeonConnectAirtimeVoucher(context, authData, event);
    const sms = buildSmsMessage(data.response.response, voucherType);

    if (false) {
      //set to true to disable the sending of smses
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
