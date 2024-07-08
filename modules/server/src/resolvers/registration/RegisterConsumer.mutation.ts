/*
mutation {
  registerConsumer(input: {
    username: "MichaelTest5"
    password: "654321"
    name: "Michael"
    appId:"
    lastName: "Test5"
    mobile: "0835649200"
    business: "MichaelTest4"
    email: "michaelk5@blts.co.za"
    id: "1234567890123"
    idType:RSA_ID|PASSPORT
    deviceSerialNo:""
    address: {
      line1: "45 Key West"
      line2: "Poets Avenue"
      line3: "Randhart"
      code: 1449
      city: "Alberton"
      province: "Gauteng"
      latitude: -26.2954
      longitude: 28.1171
    }
  }) {
    success
    message
    status
  }
}
*/

import {AddressApi, ConsumersApi, ContactApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {AuthValidationInput, MutationResolvers} from '../../generated/graphql';
import {
  createCustomer,
  DigitalOnboardingAddress,
  DigitalOnboardingCustomer,
} from '../digitalonboarding/CreateCustomer';
import {createApplication} from '../digitalonboarding/CreateApplication';

import {authValidation} from '../auth/AuthValidation.mutation';
import {saveExternalSystemReference} from '../atlas/customer/ExternalSystemReference';
import {Context} from '../../Context';
import {getTenant} from '../auth/tenant';
import {getAccount} from '../digitalonboarding/GetAccount';

export const registerConsumer: MutationResolvers['registerConsumer'] = async function (
  parent: any,
  {
    input: {
      username,
      password,
      name,
      lastName,
      mobile,
      business,
      email,
      id,
      idType,
      address,
      appId,
      deviceSerialNo,
    },
  },
  context: Context,
  info: any
) {
  try {
    const doAddress: DigitalOnboardingAddress = {
      AddressLine1: address.line1,
      AddressLine2: address.line2 ? address.line2 : '',
      AddressLine3: address.line3 ? address.line3 : '',
      AddressCode: address.code.toString(),
      Latitude: address.latitude ? address.latitude : 0,
      Longitude: address.longitude ? address.longitude : 0,
    };

    console.log(doAddress);

    const customer: DigitalOnboardingCustomer = {
      Firstname: name,
      Lastname: lastName,
      MobileNo: mobile,
      IdentityNo: id,
      Email: email,
      PostalAddress: doAddress,
      PhysicalAddress: doAddress,
    };
    const mendixAppId = await createApplication(context, 1);
    if (!mendixAppId) {
      return {
        success: false,
        message: 'Unable to create application',
        status: 0,
        token: null,
      };
    }

    const customerResult = await createCustomer(context, mendixAppId, customer);
    if (!customerResult) {
      return {
        success: false,
        message: 'Unable to create customer',
        status: 0,
        token: null,
      };
    }

    // const account = await getAccount(context, appId);
    // if (!account) {
    //   return {
    //     success: false,
    //     message: 'Unable to get account',
    //     status: 0,
    //     token: null,
    //   };
    // }

    const identityType = idType == 'RSA_ID' ? '24' : '25 '; //hardcoded since we do not have an authtoken against which to search for valid identityType Ids
    const paymentMethod = '47'; //hardcoded since we do not have an authtoken against which to search for valid payment methods

    const serverUrl = String(await getTenant(appId));

    const consumerApi = new ConsumersApi(
      new Configuration({basePath: serverUrl})
    );

    let registerResult;
    try {
      registerResult = await consumerApi.consumerRegister(
        username,
        password,
        email,
        name,
        lastName,
        business,
        identityType,
        id,
        paymentMethod,
        '',
        ''
      );
    } catch (ex) {
      let message = '';

      console.log(ex.response.data.error);
      console.log(ex.response.data.error.data.username);
      if (ex.response.data.error.data.username) {
        message = ex.response.data.error.data.username[0] + ' ';
      }
      if (ex.response.data.error.data.email) {
        message += ex.response.data.error.data.email[0];
      }
      if (ex.response.data.error.data.cust_code) {
        message += ex.response.data.error.data.cust_code[0];
      }

      if (message.length == 0) {
        message = ex.message;
      }
      return {success: false, message: message, status: 0, token: null};
    }

    const consumerId = registerResult.data.data.id;

    console.log(registerResult);

    const auth: AuthValidationInput = {
      username: username,
      password: password,
      appId: appId,
      clientMutationId: null,
      currentStatus: 1,
    };
    // @ts-ignore
    const atlasAuth = await authValidation(
      parent,
      {input: auth},
      context,
      info
    );
    console.log(atlasAuth);
    if (!atlasAuth || !atlasAuth.authorized) {
      return {
        success: false,
        message: 'Authentication error occurred',
        status: 0,
        token: null,
      };
    }

    const headers = {headers: {authorization: 'Bearer ' + atlasAuth.token}};

    const physicalAddress = 21;
    const addr2 =
      (address.line2 ? address.line2 : '') +
      (address.line3 ? ', ' + address.line3 : '');
    const location = address.latitude + ',' + address.longitude;

    const addressApi = new AddressApi(new Configuration({basePath: serverUrl}));
    const addressResult = await addressApi.addAddress(
      consumerId,
      'Customer',
      physicalAddress,
      location,
      address.line1,
      address.code.toString(),
      addr2,
      address.city,
      address.province,
      headers
    );
    if (!addressResult) {
      //do not return an error, do not block the register process
      console.log('Error adding address on Atlas');
    }

    const contactApi = new ContactApi(new Configuration({basePath: serverUrl}));

    const contactResult = await contactApi.agentContact(
      consumerId,
      'Customer',
      name,
      email,
      mobile,
      '',
      '',
      headers
    );
    if (!contactResult) {
      //do not return an error, do not block the register process
      console.log('Error adding contact on Atlas');
    }

    /**
     * get BYD details from mendix
     */
    const account = await getAccount(context, mendixAppId);
    if (!account) {
      return {
        success: false,
        message: 'Unable to get account BYD No',
        status: 0,
        token: null,
      };
    }

    console.log(account);
    /**
     * create AEON Json
     */
    const aeonDetail = {
      devices: {
        device: [
          {
            type: 'Primary',
            serial_no: deviceSerialNo,
          },
        ],
      },
      device_id: account.DeviceID,
      byd_acc_no: account.AccountID,
    };
    /**
     * save AEON Json on atlas
     */

    const aeonDetailUploadResult = await saveExternalSystemReference(
      context,
      headers,
      1,
      consumerId,
      account.AccountID,
      JSON.stringify(aeonDetail),
      appId
    );

    if (!aeonDetailUploadResult) {
      return {
        success: false,
        message: 'Unable to save Account details',
        status: 0,
        token: null,
      };
    }
    console.log(aeonDetailUploadResult);
    /**
     * BYD details from mendix
     * END
     */

    const regData = {
      status: 1,
    };
    const registerStatusSaved = await saveExternalSystemReference(
      context,
      headers,
      4,
      consumerId,
      mendixAppId,
      JSON.stringify(regData),
      appId
    );
    if (!registerStatusSaved) {
      return {
        success: false,
        message: 'Unable to save registration status',
        status: 0,
        token: null,
      };
    }

    return {
      success: true,
      message: 'Success',
      status: 1,
      token: atlasAuth.token,
    };
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message, status: 0, token: null};
  }
};
