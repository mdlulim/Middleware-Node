import {ricaConnect} from './RicaConnect';
import {IdentityMethod, MutationResolvers} from '../../generated/graphql';
import {ricaAuth} from './RicaAuth';
import {Context} from '../../Context';

/*
mutation {
  ricaRegister(input: {
    simDetails: {
      network: "Vodacom"
      simNumber: "1234568790"
    }
    isIndividual: true
    identity: {
      type: RSA_ID
      number: "7805301231234"
    }
    customer: {
      firstName: "Michael"
  		lastName: "Kuijken"
  		address: "45 Key West, Poets Street"
  		addressLine2: "45 Key West, Poets Street"
  		suburb: "Randhart"
  		city: "Alberton"
  		postCode: "1449"
  		region: "Gauteng"
  		passportCountry: "ZA"
    }
  }) {
    success
    message
  }
}
*/

export const ricaRegister: MutationResolvers['ricaRegister'] = async function (
  _parent: any,
  {input: {simDetails, isIndividual, identity, customer, appId}},
  _context: Context,
  _info: any
) {
  let data: any = {};
  try {
    const authData = await ricaAuth(_context, appId);
    if (!authData) {
      return {
        success: false,
        message: 'Auth Failed',
      };
    }

    const idType =
      identity.type === IdentityMethod.RsaId
        ? 'N'
        : identity.type === IdentityMethod.Passport
        ? 'P'
        : identity.type === IdentityMethod.Business
        ? 'B'
        : '';
    const addressBlank = {
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      cityTown: '',
      countryCode: '',
      postalCode: '',
      region: '',
      suburb: '',
    };

    const addressPopulated = {
      addressLine1: customer.address,
      addressLine2: customer.addressLine2,
      addressLine3: '',
      cityTown: customer.city,
      countryCode: 'ZA',
      postalCode: customer.postCode,
      region: customer.region,
      suburb: customer.suburb,
    };

    const registration = {
      addressBusiness: isIndividual ? addressBlank : addressPopulated,
      addressIndividual: isIndividual ? addressPopulated : addressBlank,
      contactNo: {
        areaCode: '',
        countryCode: '',
        dialingNo: '',
      },
      currentOwner: {
        businessRegistration: '',
        companyName: '',
        countryCode: '',
        IDNumber: '',
        IDType: '',
      },
      existing: false,
      idInfo: {
        businessRegistration: '',
        companyName: identity.company,
        countryCode: customer.passportCountry,
        IDNumber: identity.number,
        IDType: idType,
      },
      firstName: customer.firstName,
      lastName: customer.lastName,
      last4SIM:
        simDetails.simNumber.length < 4
          ? simDetails.simNumber
          : simDetails.simNumber.substring(simDetails.simNumber.length - 4),
      MSISDNnetwork:
        simDetails.network === 'TelkomMobile' ? 'Telkom' : simDetails.network,
      networkOptIn: '',
      portDate: '',
      portInCheck: '',
      portMsisdn: '',
      proofOfAddress: 1,
      referenceNumber: simDetails.simNumber,
      referenceNumbers: '',
      referenceType:
        simDetails.network === 'TelkomMobile' ? 'SIM' : 'Starter_Pack_Ref',
      retailerOptIn: '',
    };
    data = await ricaConnect(authData, 'Register', registration);

    return {success: true, message: data.message};
  } catch (e) {
    return {success: false, message: e.message};
  }
};
