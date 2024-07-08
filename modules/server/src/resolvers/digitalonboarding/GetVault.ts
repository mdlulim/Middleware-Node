import axios from 'axios';
import config from '../../config';
import {createLogger} from '../../logging';
import {Context} from '../../Context';

const logger = createLogger('GetVaults');

const getVault = async (context: Context, applicationId: number) => {
  try {
    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/vault`;

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
          message: 'Error Getting Vault Info (Mendix)',
          error,
        });
        return {output: false};
      });

    if (!output) {
      return false;
    }
    return output;
  } catch (error) {
    logger.error(context, {message: 'Error Getting Vault Info', error});
    return false;
  }
};

export {getVault};
