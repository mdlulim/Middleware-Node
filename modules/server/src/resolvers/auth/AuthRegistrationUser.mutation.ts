import got from 'got';
import {MutationResolvers} from '../../generated/graphql';
import config from '../../config';

export const authRegistrationUser: MutationResolvers['authRegistrationUser'] = async function (
  _parent,
  {input: {userTypeId, firstName, lastName, username, email}},
  _context,
  _info
) {
  try {
    // currently manually accessed since could not auto gen swagger login call
    const uri = `${config.get(
      'atlasAddress'
    )}/api/v1/user/register?user_type_id=${userTypeId}&first_name=${firstName}&last_name=${lastName}&username=${username}&email=${email}`;

    const output = await got.post(uri, {});
    const parsedOutput = JSON.parse(output.body);
    if (parsedOutput && parsedOutput.access_token) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (ex) {
    console.warn(ex);
    return {success: false};
  }
};
