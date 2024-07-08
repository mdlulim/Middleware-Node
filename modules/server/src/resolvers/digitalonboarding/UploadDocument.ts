import axios from 'axios';
import config from '../../config';
import {getApplicationStatus} from './GetApplicationStatus';
import {createLogger} from '../../logging';
import {Context} from '../../Context';

const logger = createLogger('UploadDocument');

enum DigitalOnboardingDocumentType {
  Contract = 'Contract',
  Supporting = 'SupportingDocument',
}

interface DigitalOnboardingDocument {
  _type: DigitalOnboardingDocumentType;
  Base64encoded_file: string;
  filename: string;
}

interface NameStatus {
  Name: string;
  Status: boolean;
}

const uploadDocument = async (
  context: Context,
  applicationId: number,
  document: DigitalOnboardingDocument
) => {
  try {
    console.log(document);
    //check if document already exists on Digital Onboarding and if so, return successful
    const status = await getApplicationStatus(context, applicationId);
    if (!status) {
      logger.error(context, {
        message: `Unable to retrieve application id with return of: applicationId:${applicationId} and result status: ${status}`,
      });
      return false;
    }

    console.log('status  ', status);

    const completed = status.find(
      (d: NameStatus) => d.Name === 'Document_' + document._type
    ).Status;

    if (completed) {
      console.log('Document (' + document._type + ') already uploaded!!');
      return true;
    }

    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/upload/document`;

    const output = await axios
      .post(uri, document, {
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
          message: 'Error Uploading Document (Mendix)',
          error: error,
        });
        return false;
      });
    console.log('Upload Document uri', uri);

    if (!output) {
      logger.info(context, {message: 'no output.body'});
      return false;
    }
    return output;
  } catch (error) {
    logger.error(context, {
      message: 'Error Uploading Document',
      error: error,
    });
    return false;
  }
};

export {
  uploadDocument,
  DigitalOnboardingDocument,
  DigitalOnboardingDocumentType,
};
