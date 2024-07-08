import {aeonConnectElectricity} from '../../AeonConnect';
import {MutationResolvers} from '../../../../generated/graphql';
import {sendSms} from '../../../cellfind/SendSms';
import {isIterable} from '../../../../util';
import {aeonAuth} from '../../AeonAuth';
import {Context} from '../../../../Context';

/*
SINGLE FBE TOKEN ONLY
mutation {
  electricityTopup(input: {amount: "20", meterNumber: "000010000006", cellNumber: "0835649200"}) {
    success
    message
  }
}

FBE + CREDIT TOKEN + ARREARS + CHARGES
mutation {
  electricityTopup(input: {amount: "20", meterNumber: "001111011068", cellNumber: "0835649200"}) {
    success
    message
  }
}
 */

const addToken = (t: any) => {
  let text = '\n' + t.Desc + '\n';
  const tokenSplit = t.Number.match(/.{1,4}/g);
  text += 'Token: ' + tokenSplit.join(' ') + '\n';
  const amt = parseFloat(t.Amount);
  const tax = parseFloat(t.Tax);
  text += 'Amount: ' + (amt + tax).toFixed(2) + '\n';
  text += 'Units: ' + t.Units + (t.UnitType ? t.UnitType : '') + '\n';
  return text;
};

const addTokens = (tokens: any) => {
  let text = '';

  if (isIterable(tokens)) {
    for (const t of tokens) {
      text += addToken(t);
    }
  } else if (tokens != null) {
    text += addToken(tokens);
  }

  return text;
};

const addBsstToken = (t: any) => {
  let text = '\n' + t.Desc + '\n';
  const tokenSplit = t.Number.match(/.{1,4}/g);
  text += 'Token: ' + tokenSplit.join(' ') + '\n';
  text += 'Amount: ' + parseFloat(t.Amount).toFixed(2) + '\n';
  text += 'Units: ' + t.Units + (t.UnitType ? t.UnitType : '') + '\n';
  return text;
};

const addBsstTokens = (tokens: any) => {
  let text = '';
  if (isIterable(tokens)) {
    for (const t of tokens) {
      text += addBsstToken(t);
    }
  } else if (tokens != null) {
    text += addBsstToken(tokens);
  }
  return text;
};

const addArrears = (debts: any) => {
  let total = 0;
  if (isIterable(debts)) {
    for (const d of debts) {
      total += parseFloat(d.Amount);
    }
  } else if (debts != null) {
    total += parseFloat(debts.Amount);
  }
  return '\nArrears: ' + total.toFixed(2) + '\n';
};

const addCharges = (costs: any) => {
  let total = 0.0;
  if (isIterable(costs)) {
    for (const c of costs) {
      total += parseFloat(c.Amount);
    }
  } else if (costs != null) {
    total += parseFloat(costs.Amount);
  }
  return 'Charges: ' + total.toFixed(2) + '\n';
};

const buildSmsMessage = (data: any) => {
  let sms = '';
  sms += data.data.Utility + '\n';
  sms += 'RCPT: ' + data.data.ReceiptNumber + '\n';
  sms += 'Ref: ' + data.data.TransRef + '\n';
  sms += 'Total value: ' + parseFloat(data.data.TenderAmount).toFixed(2) + '\n';
  sms += 'Meter: ' + data.data.Meter.MeterNum + '\n';

  if (data.data.Tokens) {
    sms += addTokens(data.data.Tokens.Token);
  }
  if (data.data.BSSTTokens) {
    sms += addBsstTokens(data.data.BSSTTokens.BSSTToken);
  }
  if (data.data.Debts) {
    sms += addArrears(data.data.Debts.Debt);
  }
  if (data.data.FixedCosts) {
    sms += addCharges(data.data.FixedCosts.Fixed);
  }

  return sms.trim();
};

export const electricityTopup: MutationResolvers['electricityTopup'] = async function (
  _parent: any,
  {input: {amount, meterNumber, cellNumber, appId}},
  context: Context,
  _info: any
) {
  let data: any = {};
  const event = {
    Amount: amount,
    MeterNum: meterNumber,
  };

  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return null;
    }
    data = await aeonConnectElectricity(context, authData, event);

    const sms = buildSmsMessage(data.response.response);

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
