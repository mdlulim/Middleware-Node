import {aeonConnect} from '../AeonConnect';
import {
  BusAccount,
  QueryResolvers,
  SvcValidation,
} from '../../../generated/graphql';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

interface Input {
  svcValidation: SvcValidation;
  auth: BusAccount;
}

interface Ticket {
  company_id: string;
  ticket_id: string;
  ticket_no: string;
  ticket_type: string;
  route_id1: string;
  route_id2: string;
  route_code1: string;
  route_code2: string;
  fare: string;
  fare_product_id: string;
  departure_location_id: string;
  destination_location_id: string;
  activation_date: string;
  expiry_date: string;
  ticket_date: string;
  no_of_days_trips: string;
  no_of_transfers: string;
  status: string;
  rules: string;
  fare_currency: string;
}

export const svcValidate: QueryResolvers['SvcValidate'] = async function (
  _parent: any,
  {svcValidation, auth}: Input,
  context: Context,
  _info: any
) {
  try {
    if (!auth) {
      return null;
    }
    const input = {
      uid: svcValidation.uid,
      svc_data: svcValidation.svcData,
    };
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'ValidateSVCData',
      {
        ...input,
      }
    );
    // @ts-ignore
    let rawData = data.response.response.tickets;
    if (!isIterable(rawData)) {
      rawData = [rawData];
    }
    // @ts-ignore
    const output = rawData.map((ticket: Ticket) => {
      return {
        cursor: ticket.ticket_id,
        node: {
          companyId: ticket.company_id,
          ticketId: ticket.ticket_id,
          ticketNo: ticket.ticket_no,
          ticketType: ticket.ticket_type,
          routeId1: ticket.route_id1,
          routeId2: ticket.route_id2,
          routeCode1: ticket.route_code1,
          routeCode2: ticket.route_code2,
          fare: ticket.fare,
          fareProductId: ticket.fare_product_id,
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
        },
      };
    });
    return {
      totalCount: output.length,
      edges: output,
    };
  } catch (e) {
    totalCount: 0;
    return {edges: []};
  }
};
