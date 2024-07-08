import {BusAccount, QueryResolvers} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

interface Input {
  input: {
    companyId: string;
    auth: BusAccount;
  };
}

interface Location {
  location_id: string;
  location_name: string;
}

export const stops: QueryResolvers['Stops'] = async function (
  _parent: any,
  {input}: Input,
  context: Context,
  _info: any
) {
  try {
    const {companyId, auth} = input;
    if (!auth) {
      return null;
    }
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'ListStops',
      {
        companyId: companyId,
      }
    );
    // @ts-ignore
    let rawData = data.response.response.ResponseMessage.locations.locations;
    if (!isIterable(rawData)) {
      rawData = [rawData];
    }
    const output = rawData.map((location: Location) => {
      return {
        cursor: location.location_id,
        node: {
          id: location.location_id,
          name: location.location_name,
        },
      };
    });
    return {
      totalCount: output.length,
      edges: output,
    };
  } catch (e) {
    return {
      totalCount: 0,
      edges: [],
    };
  }
};
