/* 
mutation LoginScreenMutation{
        authValidation(input:
         {
          username:"Azoya"
          password:"122022"
          appId:"T3TAS"
          }) {
          authorized
          token
          status
          profile {
            username
            firstName
            lastName
            identityReference
            cellNumber
            customerId
            bydNo
            ricaUsername
            isRicaActive
            userType {
              description
              slug
            }
            devices {
              serial_no
              type
            }
          }
        }
      }
      */

import got from 'got';

import {UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../generated/graphql';
import {getExternalSystemReference} from '../atlas/customer/ExternalSystemReference';
import {getDevices} from './GetDevices';
import {getTenant} from './tenant';
import config from '../../config';

interface Role {
  id: string;
  description: string;
  slug: string;
}

export const authValidation: MutationResolvers['authValidation'] = async function (
  _parent,
  {input: {username, password, appId, clientMutationId, currentStatus}},
  _context,
  _info
) {
  console.log('appID ------------', appId);
  let server = config.get('atlasAddress');

  if (appId) {
    server = String(await getTenant(appId));
    console.log('inside method');
  }

  console.log(
    '..................................................................'
  );
  console.log(server);
  console.log(
    '..................................................................'
  );
  try {
    const searchParams = {
      username: username,
      password: password,
    };

    const uri = `${server}/api/v1/login/alternative`;
    const {body} = await got.post<{
      token_type: string;
      access_token: string;
    }>(uri, {
      responseType: 'json',
      searchParams,
    });

    const authToken = `Bearer ${body.access_token}`;
    const headers = {headers: {authorization: authToken}};

    const api = new UserApi(new Configuration({basePath: String(server)}));

    console.log(api);

    const profileResult = await api.getProfile(headers).then((res) => res.data);
    const typesResult = await api.getTypes(headers).then((res) => res.data);

    const {
      id: roleId,
      description: roleDescription,
      slug: roleSlug,
    } = typesResult.data.find(
      (role: Role) => role.id == profileResult.data.user_type_id
    );

    let status = 5;
    if (currentStatus !== 5) {
      //getting external system reference
    }
    const registerStatus = await getExternalSystemReference(headers, 4, appId);
    //Get status from registerStatus
    //For rep, agent and consumer, the registerStatus will have no items so will set status to -2

    console.log(
      'reg status ',
      registerStatus.data[registerStatus.data.length - 1]
    );

    const regDetails = registerStatus.data[registerStatus.data.length - 1]
      ? registerStatus.data[registerStatus.data.length - 1]
      : {data: '{"status": 5}'};

    const {data} = regDetails;

    status = JSON.parse(data).status;
    // }

    let devices: any;
    let reference: any;
    await getDevices(_context, authToken, server).then((r) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      devices = r?.devices;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      reference = r?.reference;
    });
    let cell_no = '0';
    if (profileResult.data.customer.contacts[0]) {
      cell_no = profileResult.data.customer.contacts[0].cell_no;
    }

    if (body && body.access_token) {
      return {
        authorized: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        token: body.access_token,
        status,
        profile: {
          id: profileResult.data.id,
          customerId: profileResult.data.customer.id,
          username: profileResult.data.username,
          firstName: profileResult.data.first_name,
          lastName: profileResult.data.last_name,
          email: profileResult.data.email,
          identityReference: profileResult.data.customer.identity_reference,
          cellNumber: cell_no,
          userType: {
            id: roleId,
            description: roleDescription,
            slug: roleSlug,
          },
          devices: devices,
          bydNo: reference,
          ricaUsername: profileResult.data.rica_username,
          isRicaActive: profileResult.data.isRicaActive,
        },
        clientMutationId,
      };
    } else {
      return {
        authorized: false,
        token: null,
        status: 0,
        profile: null,
        clientMutationId,
      };
    }
  } catch (ex) {
    console.warn(ex);
    return {
      authorized: false,
      clientMutationId,
      token: null,
      status: 0,
      profile: null,
    };
  }
};
