import {
  BusAccount,
  BusTicketLookUpInput,
  QueryResolvers,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';

/*
query {
  ticketLookUp(
  input: {
    companyId: "251",
    departureLocationId: "299",
    destinationLocationId: "290",
    passType: "day_pass",
    passId: "1"
    },
    auth: {
      deviceId: "29722",
      serialNum: "P130189B21366",
      userPin: "011234",
      location: "",
      swVer: ""
    }) {
    message
    success
    locationCount
    passCount
    passEdges {
      node{
        activationRule
        companyId
        name
        passId
        passType
        passValue
        period
        price
        tripsPerDay
        weekday
      }
    }
    locationEdges {
      node{
        category
        locationId
        name
        transfersAllowed
      }
    }

    }
}
 */

interface Input {
  input: BusTicketLookUpInput;
  auth: BusAccount;
}

export interface Location {
  location_category: string;
  location_id: string;
  location_name: string;
  transfer_allowed: number;
}

export interface Pass {
  activation_rule: string;
  company_id: string;
  name: string;
  pass_id: string;
  pass_type: string;
  pass_value: string;
  period: string;
  price: string;
  trips_per_day: number;
  weekdays: string;
}

export const ticketLookUp: QueryResolvers['BusTicketLookUp'] = async function (
  _parent: any,
  {input, auth}: Input,
  context: any,
  _info: any
) {
  const {
    companyId,
    departureLocationId,
    destinationLocationId,
    passType,
    passId,
  } = input;
  try {
    if (!auth) {
      return null;
    }
    const input = {
      // universal formatter, not as unnecessary as it looks
      companyId: companyId,
      departureLocationId: departureLocationId,
      destinationLocationId: destinationLocationId,
      passType: passType,
      passId: passId,
    };
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'LookupTicket',
      {
        ...input,
      }
    );
    // @ts-ignore
    const rawData = data.response.response.TicketLookup;

    const ticketData = rawData.tickets.tickets;

    let locationData = ticketData.locations.locations;

    if (!isIterable(locationData)) {
      locationData = [locationData];
    }

    const locationOutput = locationData.map((location: Location) => {
      return {
        cursor: location.location_id,
        node: {
          locationId: location.location_id,
          category: location.location_category,
          name: location.location_name,
          transfersAllowed: location.transfer_allowed,
        },
      };
    });

    let passData = ticketData.passes.passes;

    if (!isIterable(passData)) {
      passData = [passData];
    }

    const passOutput = passData.map((pass: Pass) => {
      return {
        cursor: pass.pass_id,
        node: {
          activationRule: pass.activation_rule,
          companyId: pass.company_id,
          name: pass.name,
          passId: pass.pass_id,
          passType: pass.pass_type,
          passValue: pass.pass_value,
          price: pass.price,
          period: pass.name, // had to swap period and name field due to blank period tag
          tripsPerDay: pass.trips_per_day,
          weekdays: pass.weekdays,
        },
      };
    });

    return {
      status: rawData.status,
      success: true,
      message: rawData.message,
      ticketId: ticketData.ticket_id,
      ticketNumber: ticketData.ticket_number,
      availableFrom: ticketData.available_from,
      availableTo: ticketData.available_to,
      transferValidityPeriodMinutes:
        ticketData.transfer_validity_period_minutes,
      noOfTransfers: ticketData.no_of_transfers,
      passCount: passOutput.length,
      locationCount: locationOutput.length,
      locationEdges: locationOutput,
      passEdges: passOutput,
    };
  } catch (e) {
    console.log({e});
    return {
      status: -1,
      success: false,
      message: e.message,
      locationCount: 0,
      passEdges: [],
      locationEdges: [],
    };
  }
};
