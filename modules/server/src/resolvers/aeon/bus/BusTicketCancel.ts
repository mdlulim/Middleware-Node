import {aeonConnect} from '../AeonConnect';
import {BusAccount, MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {appendZeroes} from './BusTicketConfirm';

interface BusTicketCancelInput {
  uid: string;
  transref: string;
  svcData: [object];
  referenceId: string;
  status: string;
  ticketId: string;
  transactionId: string;
  auth: BusAccount;
}

interface Input {
  input: BusTicketCancelInput;
}

export const busTicketCancel: MutationResolvers['BusTicketCancel'] = async function (
  _parent: any,
  {
    input: {
      uid,
      transref,
      svcData,
      referenceId,
      status,
      ticketId,
      transactionId,
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
      svcData: svcData,
      referenceId: referenceId,
      status: status,
      ticketId: ticketId,
      transactionId: transactionId,
      auth: auth,
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
      'CancelTicket',
      event
    );
    const output = data.response.response;
    const sectors = output.ResponseMessage.svc_data.svc_data;
    const ticket = output.ResponseMessage.ticket;

    return {
      success: true,
      responseMessage: output.message,
      status: output.status,
      svcData: {sectors: sectors},
      ticket: {
        id: ticket.ticket_id,
        companyId: ticket.company_id,
        ticketId: ticket.ticket_id,
        ticketNo: ticket.ticket_no,
        ticketType: ticket.ticket_type,
        routes: {
          routes: ticket.routes.routes,
          //TODO fix, pending change from Bpass
          // routes: [],
        },
        fare: ticket.fare,
        fareProductId: ticket.fare_product_id,
        passId: ticket.pass_id,
        departureLocationId: ticket.departure_location_id,
        destinationLocationId: ticket.destination_location_id,
        activationDate: ticket.activation_date,
        expiryDate: ticket.expiry_date,
        ticketDate: ticket.ticket_date,
        numberOfDaysTrips: ticket.no_of_days_trips,
        numberOfTransfers: ticket.no_of_transfers,
        status: ticket.status,
        rules: ticket.rules,
        fareCurrency: ticket.fare_currency,
        locations: ticket.locations.locations,
      },
      transaction: {
        id: output.ResponseMessage.transaction.transaction_id,
        amount: output.ResponseMessage.transaction.amount,
        name: output.ResponseMessage.transaction.reference_id,
        description: output.ResponseMessage.transaction.uid,
      },
      transref: output.ResponseMessage.transref,
    };

    // return {success: true, message: data.message};
  } catch (e) {
    console.log({e});
    return {success: false, responseMessage: e.message};
  }
};
