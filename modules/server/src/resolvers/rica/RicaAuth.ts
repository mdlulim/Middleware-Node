// gets user aeon login details
// using atlas api calls

import got from 'got';
import {Context} from '../../Context';
import {getTenant} from '../auth/tenant';
import config from '../../config';

export const ricaAuth = async function (context: Context, appId: any) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const uri = `${serverUrl}/api/v1/customer/external_system_reference?external_system_id=2`;

    const output = await got.get(uri, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    const resp = JSON.parse(output.body);

    return {
      username: JSON.parse(resp.data[0].data).rica_username,
      password: JSON.parse(resp.data[0].data).rica_password,
    };
  } catch (ex) {
    console.warn({ex});
    return false;
  }
};
