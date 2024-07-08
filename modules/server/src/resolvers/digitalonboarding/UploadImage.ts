import axios from 'axios';
import config from '../../config';
import {getApplicationStatus} from './GetApplicationStatus';
import {Context} from '../../Context';
import {createLogger} from '../../logging';

const logger = createLogger('UploadImage');

enum DigitalOnboardingImageType {
  Address = 'POR',
  IdBack = 'ID_BACK',
  IdFront = 'ID_Front',
  Selfie = 'Selfie',
  Outlet = 'Outlet',
}

interface DigitalOnboardingImage {
  _type: DigitalOnboardingImageType;
  Base64encoded_file: string;
  filename: string;
}

interface NameStatus {
  Name: string;
  Status: boolean;
}

const uploadImage = async (
  context: Context,
  applicationId: number,
  image: DigitalOnboardingImage
) => {
  try {
    //check if image already exists on Digital Onboarding and if so, return successful
    const status = await getApplicationStatus(context, applicationId);

    if (!status) {
      return false;
    }

    const completed = status.find(
      (d: NameStatus) => d.Name === 'Image_' + image._type
    ).Status;
    if (completed) {
      console.log('Image (' + image._type + ') already uploaded!!');
      return true;
    }

    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/upload/image`;

    const output = await axios
      .post(uri, image, {
        headers: {
          Authorization: 'Basic VDNUQXBwOlF3ZXJAMTIzNA==',
          ApplicationID: applicationId.toString(),
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        logger.error(context, {
          message: 'Error Uploading Image (Mendix)',
          error: error,
        });
        return false;
      });

    if (!output) {
      console.log('UploadImage no output.body');
      return false;
    }
    return true;
  } catch (error) {
    logger.error(context, {
      message: 'Error Uploading Image',
      error: error,
    });
    return false;
  }
};

export {uploadImage, DigitalOnboardingImage, DigitalOnboardingImageType};
