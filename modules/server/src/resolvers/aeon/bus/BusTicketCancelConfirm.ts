import {aeonConnect} from '../AeonConnect';
import {BusAccount, MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {printjobToJson} from '../printutil/PrintJobConverter';
import {appendZeroes} from './BusTicketConfirm';
/*mutation {
  busTicketCancelConfirm(input: { transref:"100720",
    uid:"45CF54B4",
    status:"confirmed",
    ticketId:"1002",
    transactionId:"1253",
     svcData: [
      {sector:{
        sector_no:"10",
        block0: "00000000000000000000000000000000",
        block1: "00000000000000000000000000000000",
        block2: "00000000000000000000000000000000"
      },},
        {sector: {
          sector_no:"11",
          block0: "4748337A59666C616270324257743148",
          block1: "4D2F7557524A75384F64466F784B5156",
          block2: "356276617368334F374E4A75506E6B37"
        },},
        {sector: {
          sector_no:"12",
          block0: "5646396D6566786C70675961456C772F",
          block1: "00008205000000000000000000000000",
          block2: "00000000000000000000000000000000"
        },},
        {sector: {
          sector_no:"13",
          block0: "00000000000000000000000000000000",
          block1: "00000000000000000000000000000000",
          block2: "00000000000000000000000000000000"
        }}
        ],
    auth: {
        deviceId: "29851",
      serialNum: "p130189801394",
      userPin: "011234",
      location: "",
      swVer: "bluShift"
    }}) {
    message
    success
   svcData {
    sectors {
      block0
      block1
      block2
    }
  }
  ticket {
        ticketId
        ticketType
        expiryDate
        fareProductId
        status
        ticketNo
        activationDate
        rules
        expiryDate
        id
      }
    transaction {
        amount
        name
        description
        id
      }
      transref
      printLines
      merchantPrintLines
  }
}*/
interface BusTicketCancelInput {
  uid: string;
  transref: string;
  svcData: [object];
  status: string;
  ticketId: string;
  transactionId: string;
  auth: BusAccount;
}
interface Input {
  input: BusTicketCancelInput;
}
export const busTicketCancelConfirm: MutationResolvers['BusTicketCancelConfirm'] = async function (
  _parent: any,
  {
    input: {uid, transref, svcData, status, ticketId, transactionId, auth},
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
      'ConfirmCancelTicket',
      event
    );
    const output = data.response.response;
    const sectors = output.ResponseMessage.svc_data.svc_data;
    const ticket = output.ResponseMessage.ticket;
    return {
      success: true,
      message: output.message,
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
        //  locations: ticket.locations.locations,
      },
      transaction: {
        id: output.ResponseMessage.transaction.transaction_id,
        amount: output.ResponseMessage.transaction.amount,
        name: output.ResponseMessage.transaction.reference_id,
        description: output.ResponseMessage.transaction.uid,
      },
      printLines: JSON.stringify(
        printjobToJson(output.ResponseMessage.PrintLines)
      ),
      merchantPrintLines: JSON.stringify(
        printjobToJson(output.ResponseMessage.MerchantPrintLines)
      ),
    };
    // return {success: true, message: data.message};
  } catch (e) {
    return {success: false, message: e.message};
  }
};
