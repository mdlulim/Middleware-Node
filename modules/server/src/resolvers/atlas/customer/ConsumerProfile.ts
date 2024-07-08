import axios from 'axios';
import {MutationResolvers} from '../../../generated/graphql';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/**
 * mutation{
 *    consumerProfile(input:{appId:"T3TSA",custCode:"lisaqa"}){
 *     id
 *     email
 *     customerId
 *     cellNumber
 *     names
 *     address_line_1
 *     address_line_2
 *     city
 *     postal_code
 *     province
 *     user_type
 *     customer_status
 *     images{
 *       type
 *       base64
 *     }
 *   }
 * }
 * @param _parent
 * @param appId
 * @param custCode
 * @param context
 */
// @ts-ignore
export const consumerProfile: MutationResolvers['consumerProfile'] = async function (
  _parent: any,
  {input: {appId, custCode}},
  context: Context
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;
    const serverUrl = String(await getTenant(appId));
    const uri = `${serverUrl}/api/v1/consumer/accountDetails`;

    const config = {
      method: 'get',
      url: uri,
      headers: {
        Accept: 'application/json',
        Authorization: `${authToken}`,
      },
      params: {
        cust_code: custCode,
      },
      maxBodyLength: Infinity,
    };

    const output = await axios
      // @ts-ignore
      .request(config)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error,
        };
      });

    if (!output) {
      return null;
    }

    const documents = output.data.images;
    const images = Object.keys(documents).map((key) => ({
      type: key,
      base64: documents[key],
    }));

    const result = {
      success: true,
      message: 'Success',
      customerId: output.data.id,
      user_type: output.data.user_type,
      customer_status: output.data.customer_status,
      cellNumber: output.data.cell_no,
      names: output.data.name,
      email: output.data.mail_address,
      identity_reference: output.data.identity_reference,
      address_line_1: output.data.address_line_1,
      address_line_2: output.data.address_line_2,
      city: output.data.city,
      postal_code: output.data.postal_code,
      province: output.data.province,
      payment_method: output.data.payment_method,
      identity_type: output.data.identity_type,
      images: images,
    };

    return result;
  } catch (ex) {
    // on any errors, do not return profile
    return {
      success: false,
      message: 'Not Found',
      customerId: null,
      user_type: null,
      customer_status: null,
      cellNumber: null,
      names: null,
      email: null,
      identity_reference: null,
      address_line_1: null,
      address_line_2: null,
      city: null,
      postal_code: null,
      province: null,
      payment_method: null,
      identity_type: null,
      images: null,
    };
  }
};
