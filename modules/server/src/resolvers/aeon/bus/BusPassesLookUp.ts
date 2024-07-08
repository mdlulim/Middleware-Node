import {
  BusAccount,
  BusPassesLookUpInput,
  QueryResolvers,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';
// eslint-disable-next-line import/named
import {Pass} from './BusTicketLookUp';

/*
query {
  passesLookUp(
    input: {ticketNumber: "245_A",},
    auth: {
      deviceId: "29823",
      serialNum: "P138189C00366",
      userPin: "011234",
      location: "",
      swVer: ""
    }) {
		status
    message
    success
    edges {
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
    		 weekdays
      }
    }
  }
}
 */

interface Input {
  input: BusPassesLookUpInput;
  auth: BusAccount;
}

export const passesLookUp: QueryResolvers['BusPassesLookUp'] = async function (
  _parent: any,
  {input, auth}: Input,
  context: any,
  _info: any
) {
  const {ticketNumber} = input;
  try {
    if (!auth) {
      return null;
    }
    const input = {
      // universal formatter, not as unnecessary as it looks
      ticketNumber: ticketNumber,
    };
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'LookupPasses',
      {
        ...input,
      }
    );
    // @ts-ignore
    const rawData = data.response.response.PassLookup;

    let passData = rawData.passes.passes;

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
          period: pass.period,
          tripsPerDay: pass.trips_per_day,
          weekdays: pass.weekdays,
        },
      };
    });

    return {
      status: rawData.status,
      success: true,
      message: rawData.message,
      totalCount: passOutput.length,
      edges: passOutput,
    };
  } catch (e) {
    console.log({e});
    return {
      status: -1,
      success: false,
      message: e.message,
      edges: [],
      totalCount: 0,
    };
  }
};
