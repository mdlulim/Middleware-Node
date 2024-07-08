/*
mutation {
  registerConsumerByd(input: {
    DeviceSerialNo: "112336665",
    appId
   }) {
    success
    message
    status
  }
}
*/

import {UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../generated/graphql';
import {
  createCustomer,
  DigitalOnboardingAddress,
  DigitalOnboardingCustomer,
} from '../digitalonboarding/CreateCustomer';
import {createApplication} from '../digitalonboarding/CreateApplication';
import {getAccount} from '../digitalonboarding/GetAccount';
import {saveExternalSystemReference} from '../atlas/customer/ExternalSystemReference';
import {Context} from '../../Context';
import {getTenant} from '../auth/tenant';
import config from '../../config';

export const registerConsumerByd: MutationResolvers['registerConsumerByd'] = async function (
  _parent: any,
  {input: {DeviceSerialNo, appIds}},
  context: Context,
  _info: any
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;
    const headers = {headers: {authorization: `${authToken}`}};

    let serverUrl = config.get('atlasAddress');
    if (appIds) {
      serverUrl = String(await getTenant(appIds));
    }

    const api = new UserApi(new Configuration({basePath: serverUrl}));

    const profileResult = await api.getProfile(headers).then((res) => res.data);

    console.log(profileResult);

    const line1 = profileResult.data.customer.addresses[0].address_line_1;
    const line2 = profileResult.data.customer.addresses[0].address_line_2;
    const line3 = profileResult.data.customer.addresses[0].city;
    const code = profileResult.data.customer.addresses[0].postal_code;
    let latitude = 0;
    let longitude = 0;
    if (
      profileResult.data.customer.addresses[0].gps_coordinates !== '' &&
      profileResult.data.customer.addresses[0].gps_coordinates != null
    ) {
      const gps = profileResult.data.customer.addresses[0].gps_coordinates.split(
        /[ ,]+/
      );

      latitude = gps[0];
      longitude = gps[1];
    }

    //console.log("long : ",longitude," lat : ",latitude)

    const doAddress: DigitalOnboardingAddress = {
      AddressLine1: line1,
      AddressLine2: line2 ? line2 : line1,
      AddressLine3: line3 ? line3 : '',
      AddressCode: code.toString(),
      Latitude: latitude ? latitude : 0,
      Longitude: longitude ? longitude : 0,
    };

    console.log('address ', doAddress);

    const customerId = profileResult.data.customer.id;
    const firstName = profileResult.data.first_name;
    const lastName = profileResult.data.last_name;
    const email = profileResult.data.email;
    const identityReference = profileResult.data.customer.identity_reference;
    const cellNumber = profileResult.data.customer.contacts[0].cell_no;

    const customer: DigitalOnboardingCustomer = {
      Firstname: firstName,
      Lastname: lastName,
      MobileNo: cellNumber,
      IdentityNo: identityReference,
      Email: email,
      PostalAddress: doAddress,
      PhysicalAddress: doAddress,
    };

    console.log('customer : ', customer);

    const appId = await createApplication(context, 1);
    if (!appId) {
      return {
        success: false,
        message: 'Unable to create application',
        status: '0',
        token: null,
      };
    }

    const customerResult = await createCustomer(context, appId, customer);

    //console.log("mendix result", customerResult['output']);

    if (!customerResult) {
      return {
        success: false,
        message: 'Unable to create customer',
        status: '0',
        token: null,
      };
    }
    //return
    const account = await getAccount(context, appId);
    if (!account) {
      return {
        success: false,
        message: 'Unable to get account',
        status: '0',
        token: null,
      };
    }

    const serial = DeviceSerialNo;
    const aeonDetail = {
      devices: {
        device: [
          {
            type: 'Primary',
            serial_no: serial,
          },
        ],
      },
      device_id: account.DeviceID,
      byd_acc_no: account.AccountID,
    };

    const aeonDetailUploadResult = await saveExternalSystemReference(
      context,
      headers,
      1,
      customerId,
      account.AccountID,
      JSON.stringify(aeonDetail),
      appIds
    );
    if (!aeonDetailUploadResult) {
      return {
        success: false,
        message: 'Unable to save Account details',
        status: '0',
        token: null,
      };
    }

    const regData = {
      status: 1,
    };
    const registerStatusSaved = await saveExternalSystemReference(
      context,
      headers,
      4,
      customerId,
      appId,
      JSON.stringify(regData),
      appIds
    );
    if (!registerStatusSaved) {
      return {
        success: false,
        message: 'Unable to save registration status',
        status: '0',
        token: '',
      };
    }

    return {
      success: true,
      message: 'Success',
      status: '1',
      token: authToken !== undefined ? authToken.toString() : '-1',
    };
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message, status: '0', token: null};
  }
};
