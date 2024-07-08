import axios from 'axios';
import {MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*
mutation {
  sellStock(input: {barcode: "78637284628", appId:"T3TSA"}) {
    success
    message
  }
}
*/

export const sellStock: MutationResolvers['sellStock'] = async function (
  _parent: any,
  {input: {barcode, appId}},
  context: Context,
  _info: any
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;

    const serverUrl = String(await getTenant(appId));
    const uri = `${serverUrl}/api/v2/stock/${barcode}/sale`;
    const config = {
      method: 'POST',
      url: uri,
      headers: {
        Accept: 'application/json',
        Authorization: `${authToken}`,
      },
      params: {
        barcode: barcode,
      },
      maxBodyLength: Infinity,
    };

    const sellResult = await axios
      // @ts-ignore
      .request(config)
      .then((response) => {
        //console.log(response);
        return response.data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error,
        };
      });

    if (!sellResult) {
      return {
        success: false,
        message: 'Failed to update stock status',
      };
    }

    const result = {
      success: true,
      message: 'Success',
    };

    return result;
  } catch (ex) {
    // on any errors, do not return profile
    return {
      success: false,
      message: 'Not Found',
    };
  }
};
