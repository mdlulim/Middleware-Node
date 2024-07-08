import axios from 'axios';
import config from '../../config';
import {Context} from '../../Context';
import {createLogger} from '../../logging';

const logger = createLogger('GetApplicationStatus');

const getApplicationStatus = async (
  context: Context,
  applicationId: number
) => {
  try {
    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/application/status`;

    const output = await axios
      .get(uri, {
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
          message: 'Error Getting Application Status (Mendix)',
          error,
        });
        return false;
      });

    if (!output) {
      return false;
    }
    return output;
  } catch (error) {
    logger.error(context, {message: 'Error Getting Application Status', error});
    return false;
  }
};

export {getApplicationStatus};
