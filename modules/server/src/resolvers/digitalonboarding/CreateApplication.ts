import axios from 'axios';
import config from '../../config';
import {Context} from '../../Context';
import {createLogger} from '../../logging';

const logger = createLogger('CreateApplication');

const createApplication = async (context: Context, templateId: number) => {
  try {
    const uri = `${config.get(
      'mendixAddress'
    )}/digitalonboarding/v1/registration/application`;

    const output = await axios
      .post(uri, null, {
        headers: {
          Authorization: 'Basic VDNUQXBwOlF3ZXJAMTIzNA==',
          TemplateID: templateId.toString(),
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        logger.error(context, {
          message: 'Error Creating Application (Mendix)',
          error,
        });
        return false;
      });

    if (!output) {
      return false;
    }
    return output.ApplicationID;
  } catch (error) {
    logger.error(context, {message: 'Error Creating Application', error});
    return false;
  }
};

export {createApplication};
