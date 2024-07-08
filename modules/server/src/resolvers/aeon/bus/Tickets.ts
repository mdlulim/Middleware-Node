import {aeonConnect} from '../AeonConnect';
import {
  BusAccount,
  SvcValidation,
  QueryResolvers,
  RouteRecursor,
} from '../../../generated/graphql';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

/*query{
  tickets(svcValidation:{
    uid: "45CF54B4",
     svcData:  [
      {sector:
       {sector_no:"10",
        block0: "00000000645663635132474972347252",
        block1: "394137674B4C796A4666377273766357",
        block2: "4D71754731503142524E2F723879624C"
      }},
        {sector:
          {sector_no: "11",
           block0: "6A7A4B776D4B6163306C637034485978",
           block1: "48313850354B57722F7179574B585955",
            block2: "6F4D58586B72743166585073354A586B"
          }},
       {sector:
        {
          sector_no: "12",
        block0: "69654F30554953656D6D6669306B553D",
            block1: "00000792040000000000000000000792",
            block2: "0F00000000000000000007920A000000"
        }},
        {sector:
          {sector_no: "13",
          block0: "00000000000000000000000000000000",
          block1: "00000000000000000000000000000000",
          block2: "00000000000000000000000000000000"
        }}
        ]

  },
    auth:{ deviceId: "29851",
                      serialNum: "P130189801394",
                      userPin: "011234",
                      location: "",
                      swVer: ""}
  ){
    totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          status
          numberOfDaysTrips
          ticketId
          ticketNo
          destinationLocationId
          departureLocationId
          fareCurrency
          ticketType
          expiryDate
          activationDate
          numberOfDaysTrips
          companyId
        	fare
          fareProductId
          passId
          locations{
          	location_name
            location_id
            transfer_allowed
          }
        }
      }
  }
}*/

import {Location} from './BusTicketLookUp';

interface Input {
  svcValidation: SvcValidation;
  auth: BusAccount;
}

interface Ticket {
  company_id: string;
  ticket_id: string;
  ticket_no: string;
  ticket_type: string;
  ticket_sale_id: string;
  pass_id: string;
  routes: RouteRecursor;
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
  locations: {locations: [Location]};
}

export const tickets: QueryResolvers['Tickets'] = async function (
  _parent: any,
  {svcValidation, auth}: Input,
  context: Context,
  _info: any
) {
  try {
    if (!auth) {
      return null;
    }
    const sectors = svcValidation.svcData;
    const input = {
      uid: svcValidation?.uid || '',
      // ticketId: svcValidation?.ticketId || '',
      svc_data: sectors,
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
    const response = data.response.response.ResponseMessage;

    if (!response.hasOwnProperty('tickets')) {
      return {
        success: true,
        message: response.message,
        totalCount: 0,
        edges: [],
      };
    }

    let rawData = response.tickets.tickets;

    if (!isIterable(rawData)) {
      rawData = [rawData];
    }
    const output = rawData.map((ticket: Ticket) => {
      return {
        cursor: ticket.ticket_sale_id,
        node: {
          companyId: ticket.company_id,
          ticketId: ticket.ticket_sale_id,
          ticketNo: ticket.ticket_no,
          ticketType: ticket.ticket_type,
          passId: ticket.pass_id,
          ticketSaleId: ticket.ticket_sale_id,
          routes: {
            routes: ticket.routes.routes,
          },
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
          locations: ticket.locations.locations,
        },
      };
    });
    return {
      success: true,
      message: 'Success',
      totalCount: output.length,
      edges: output,
    };
  } catch (e) {
    return {success: false, message: e.message, totalCount: 0, edges: []};
  }
};
