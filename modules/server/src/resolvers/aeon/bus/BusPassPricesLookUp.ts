import {
  BusAccount,
  BusPassPricesLookUpInput,
  QueryResolvers,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';

/*
query {
  passPricesLookUp(
    input: {companyId: "251", passId: "3",},
    auth: {
      deviceId: "29927",
      serialNum: "P130199B05326",
      userPin: "011234",
      location: "",
      swVer: ""
    }) {
	status
    message
    success
    edges {
      node{
          passId
    	  price
    	  validFrom
    	  validTo
      }
    }
  }
}
 */

interface Price {
  pass_id: string;
  price: string;
  valid_from: string;
  valid_to: string;
}

interface Input {
  input: BusPassPricesLookUpInput;
  auth: BusAccount;
}

export const passPricesLookUp: QueryResolvers['BusPassPricesLookUp'] = async function (
  _parent: any,
  {input, auth}: Input,
  context: any,
  _info: any
) {
  const {companyId, passId} = input;
  try {
    if (!auth) {
      return null;
    }
    const input = {
      // universal formatter, not as unnecessary as it looks
      companyId: companyId,
      passId: passId,
    };
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'LookupPassPrices',
      {
        ...input,
      }
    );
    // @ts-ignore
    const rawData = data.response.response.PassPriceLookup;

    let passPricesData = rawData.tickets.tickets;

    if (!isIterable(passPricesData)) {
      passPricesData = [passPricesData];
    }

    const passPricesOutput = passPricesData.map((price: Price) => {
      return {
        cursor: price.pass_id,
        node: {
          passId: price.pass_id,
          price: price.price,
          validFrom: price.valid_from,
          validTo: price.valid_to,
        },
      };
    });

    return {
      status: rawData.status,
      success: true,
      message: rawData.message,
      totalCount: passPricesOutput.length,
      edges: passPricesOutput,
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
