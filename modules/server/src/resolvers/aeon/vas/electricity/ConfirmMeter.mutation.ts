import {aeonConnect} from '../../AeonConnect';
import {MutationResolvers} from '../../../../generated/graphql';
import {aeonAuth} from '../../AeonAuth';
import {Context} from '../../../../Context';

/*
mutation {
  confirmMeter(input: {meterNumber: "000010000006",appId:"T3TSA"}) {
    success
    message
    detail {
      transRef
      customer
      address
      utility
      trxTypeId
    }
  }
}
 */

const parseConfirmMeterDetail = (data: any) => {
  return {
    transRef: data.response.response.data.TransRef,
    customer: data.response.response.data.CustomerName,
    address: data.response.response.data.CustomerAddress,
    utility: data.response.response.data.Utility,
    trxTypeId: data.response.response.data.TransactionTypeId,
  };
};

export const confirmMeter: MutationResolvers['confirmMeter'] = async function (
  _parent: any,
  {input: {meterNumber, appId}},
  context: Context,
  _info: any
) {
  const authData = await aeonAuth(context, appId);
  if (!authData) {
    return null;
  }
  let data: any = {};
  const event = {
    Amount: 0,
    MeterNum: meterNumber,
  };

  try {
    data = await aeonConnect(
      context,
      authData,
      'Electricity',
      'ConfirmMeter',
      event
    );
    const detail = parseConfirmMeterDetail(data);

    if (!detail.customer) {
      return {success: false, message: "Couldn't find customer", detail: null};
    }
    if (!detail.address) {
      return {success: false, message: "Couldn't find address", detail: null};
    }

    return {success: true, message: data.message, detail: detail};
  } catch (e) {
    return {success: false, message: e.message, detail: null};
  }
};
