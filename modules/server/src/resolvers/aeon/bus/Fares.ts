import {
  QueryResolvers,
  BusAccount,
  RouteRecursor,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

/*
query {
  fares(input:
    {
    companyId: "100001",
    departureLocationId: "",
    destinationLocationId: "",
    routeId: 0,
    fareProductId: "1298",
    auth: {
      deviceId: "29721",
      serialNum: "P130189B00366",
      userPin: "011234",
      location: "",
      swVer: ""
    }
    }) {
 totalCount
    sessionId
    responseCode
    responseMessage
    status
    edges {
  node {
    id
    period
    fareProductId
    code
    routes{
      routes
    }
    companyId
    code
    weekdays
    created
    availableFrom
    availableTo
    transferCount
    passValue
    tripsPerDay
    passType
    price
    name
    shortName
    desc
      }
    }

    }
}
 */

interface Input {
  input: {
    companyId: string;
    departureLocationId: string;
    destinationLocationId: string;
    routeId: string;
    fareProductId: string;
    auth: BusAccount;
  };
}

interface FareProduct {
  period: string;
  routes: RouteRecursor;
  fare_product_id: string;
  code: string;
  company_id: string;
  weekdays: string;
  created: string;
  available_to: string;
  no_of_transfers: string;
  available_from: string;
  pass_value: string;
  trips_per_day: string;
  pass_type: string;
  price: string;
  name: string;
  short_name: string;
  desc: string;
}

export const fares: QueryResolvers['Fares'] = async function (
  _parent: any,
  {
    input: {
      companyId,
      departureLocationId,
      destinationLocationId,
      routeId,
      fareProductId,
      auth,
    },
  }: Input,
  context: Context,
  _info: any
) {
  try {
    if (!auth) {
      return null;
    }
    const input = {
      // universal formatter, not as unnecessary as it looks
      companyId: companyId,
      departureLocationId: departureLocationId || '',
      destinationLocationId: destinationLocationId || '',
      routeId: routeId || '',
      fareProductId: fareProductId || '',
    };
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'LookupFareProduct',
      {
        ...input,
      }
    );
    let rawData =
      // @ts-ignore
      data.response.response.ResponseMessage.fare_products.fare_products;
    if (!isIterable(rawData)) {
      rawData = [rawData];
    }
    // @ts-ignore
    const response = data.response.response;

    const output = rawData.map((fareProduct: FareProduct) => {
      const price = parseFloat(fareProduct.price);
      return {
        cursor: fareProduct.code,
        node: {
          id: fareProduct.fare_product_id,
          period: fareProduct.period,
          fareProductId: fareProduct.fare_product_id,
          code: fareProduct.code,
          routes: {
            routes: fareProduct.routes.routes,
          },
          companyId: fareProduct.company_id,
          weekdays: fareProduct.weekdays,
          created: fareProduct.created,
          availableTo: fareProduct.available_to,
          transferCount: fareProduct.no_of_transfers,
          availableFrom: fareProduct.available_from,
          passValue: fareProduct.pass_value,
          tripsPerDay: fareProduct.trips_per_day,
          passType: fareProduct.pass_type,
          price: price,
          name: fareProduct.name,
          shortName: fareProduct.short_name,
          desc: fareProduct.desc.toString() ? fareProduct.desc.toString() : '',
        },
      };
    });

    return {
      totalCount: output.length,
      sessionId: response.SessionId,
      responseCode: response.ResponseMessage.status,
      responseMessage: response.ResponseMessage.message,
      status: response.ResponseMessage.status,
      edges: output,
    };
  } catch (e) {
    return {
      totalCount: 0,
      edges: [],
    };
  }
};
