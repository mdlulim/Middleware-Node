import {aeonConnect} from '../AeonConnect';
import {BusAccount, MutationResolvers} from '../../../generated/graphql';
import {getPrintJob} from '../../../aeonutiils';
import {Context} from '../../../Context';
interface BusTicketConfirmInput {
  transref: string;
  uid: string;
  status: string;
  ticketId: string;
  transactionId: string;
  amount: string;
  paymentType: string;
  companyId: string;
  svcData: object;
  auth: BusAccount;
}
interface Input {
  input: BusTicketConfirmInput;
}

export const appendZeroes = (uid: string) => {
  const numberOfZerosMissing = 14 - uid.length;
  let completeUid = uid;
  for (let i = 0; i < numberOfZerosMissing; i++) {
    completeUid += '0';
  }
  return completeUid;
};
export const busTicketConfirm: MutationResolvers['BusTicketConfirm'] = async function (
  _parent: any,
  {
    input: {
      transref,
      uid,
      status,
      ticketId,
      transactionId,
      amount,
      paymentType,
      companyId,
      svcData,
      auth,
    },
  }: Input,
  context: Context,
  _info: any
) {
  let data: any = {};

  const completeUid = appendZeroes(uid);

  try {
    const event = {
      uid: completeUid,
      transref: transref,
      status: status,
      ticketId: ticketId,
      transactionId: transactionId,
      amount: amount,
      paymentType: paymentType,
      companyId: companyId,
      svcData: svcData,
    };
    if (!auth) {
      return {success: false, message: data.message};
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    data = await aeonConnect(
      context,
      auth,
      'NFCSmartTap',
      'ConfirmCheckout',
      event
    );
    const output = data.response.response.ResponseMessage;
    const sectors = output.svc_data.svc_data;
    const ticket = {
      id: output.ticket.ticket_id,
      responseCode: output.status,
      responseMessage: output.message,
      companyId: output.ticket.company_id,
      ticketId: output.ticket.ticket_id,
      ticketNo: output.ticket.ticket_no,
      ticketType: output.ticket.ticket_type,
      routes: output.ticket.routes,
      fare: output.ticket.fare,
      fareProductId: output.ticket.fare_product_id,
      departureLocationId: output.ticket.departure_location_id,
      destinationLocationId: output.ticket.destination_location_id,
      activationDate: output.ticket.activation_date,
      expiryDate: output.ticket.expiry_date,
      ticketDate: output.ticket.ticket_date,
      numberOfDaysTrips: output.ticket.no_of_days_trips,
      numberOfTransfers: output.ticket.no_of_transfers,
      status: output.ticket.status,
      rules: output.ticket.rules,
      fareCurrency: output.ticket.fare_currency,
    };
    const transaction = {
      id: output.transaction.transaction_id,
      amount: output.transaction.amount,
      name: output.transaction.reference_id,
      description: output.transaction.uid,
    };
    return {
      success: true,
      message: output.message,
      status: output.status,
      svcData: {
        sectors: sectors,
      },
      ticket: ticket,
      transaction: transaction,
      transref: output.transref,
      printLines: JSON.stringify(getPrintJob(output.PrintLines.line)),
      merchantPrintLines: JSON.stringify(
        getPrintJob(output.MerchantPrintLines.line)
      ),
    };
    // return {success: true, message: data.message};
  } catch (e) {
    console.log({e});
    return {success: false, message: e.message};
  }
};
