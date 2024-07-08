import axios from 'axios';
import config from '../../config';
import {createLogger} from '../../logging';
import {Context} from '../../Context';

const logger = createLogger('CompleteRegistration');

const completeRegistration = async (
  context: Context,
  applicationId: number
) => {
  try {
    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/complete`;

    logger.info(context, {message: 'starting complete registration'});

    const output = await axios
      .post(uri, null, {
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
          message: 'Error Completing Registration (Mendix)',
          error: error,
        });
        return false;
      });

    logger.info(context, {
      message: `CompleteRegistrationOutput ${JSON.stringify(output)}`,
    });

    if (!output) {
      return false;
    }
    return true;
  } catch (error) {
    logger.error(context, {message: 'Error Completing Registration', error});
    return false;
  }
};

export {completeRegistration};
