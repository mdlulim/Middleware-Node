import {QueryResolvers, BusAccount} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

interface Input {
  companyId: string;
  departureLocationId: string;
  auth: BusAccount;
}

interface Location {
  location_id: string;
  type: string;
  station_id: string;
  name: string;
  entity_id: string;
}

export const destinations: QueryResolvers['Destinations'] = async function (
  _parent: any,
  {companyId, departureLocationId, auth}: Input,
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
      departureLocationId: departureLocationId,
    };
    const data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'NFCSmartTap',
      'LookupDestinations',
      {
        ...input,
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
          locationId: location.location_id,
          type: location.type,
          stationId: location.station_id,
          name: location.name,
          entityId: location.entity_id,
        },
      };
    });

    return {
      totalCount: output.length,
      edges: output,
    };
  } catch (e) {
    console.log({e});
    return {
      totalCount: 0,
      edges: [],
    };
  }
};
