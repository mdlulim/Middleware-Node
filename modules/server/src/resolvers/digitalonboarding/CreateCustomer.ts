import axios from 'axios';
import config from '../../config';
import {Context} from '../../Context';
import {createLogger} from '../../logging';

const logger = createLogger('CreateCustomer');

interface DigitalOnboardingAddress {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressCode: string;
  Latitude: number;
  Longitude: number;
}

interface DigitalOnboardingCustomer {
  Firstname: string;
  Lastname: string;
  MobileNo: string;
  IdentityNo: string;
  Email: string;
  PostalAddress: DigitalOnboardingAddress | null | undefined;
  PhysicalAddress: DigitalOnboardingAddress | null | undefined;
}

const createCustomer = async (
  context: Context,
  applicationId: number,
  customer: DigitalOnboardingCustomer
) => {
  try {
    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/customer`;
    console.log(customer);

    const output = await axios
      .post(uri, customer, {
        headers: {
          Authorization: 'Basic VDNUQXBwOlF3ZXJAMTIzNA==',
          ApplicationId: applicationId.toString(),
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        logger.error(context, {
          message: 'Error Creating Customer (Mendix)',
          error: error,
        });

        // console.log(output)
        return false;
      });

    if (!output) {
      return false;
    }
    return output;
  } catch (error) {
    logger.error(context, {
      message: 'Error Creating Customer',
      error: error,
    });
    return false;
  }
};

export {createCustomer, DigitalOnboardingCustomer, DigitalOnboardingAddress};
