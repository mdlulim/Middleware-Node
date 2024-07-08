import axios from 'axios';
import {createLogger} from '../../logging';
import {Context} from '../../Context';

const logger = createLogger('getDevices');

export const getDevices = async function (
  context: Context,
  authToken: any,
  serverurl: any
) {
  try {
    //  const authToken = context && context.req && context.req.headers.atlasauth;
    const uri = `${serverurl}/api/v1/customer/external_system_reference?external_system_id=1`;

    const output = await axios
      .get(uri, {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then(function (response) {
        logger.info(context, {
          message: `AeonAuth response: ${response}`,
        });
        return response.data;
      })
      .catch(function (error) {
        logger.error(context, {
          message: 'Error Getting Auth (AEON)',
          error: error,
        });
        return {output: false};
      });

    if (!output.data) {
      logger.error(context, {
        message: 'Unable to get AEON data',
      });
      return false;
    }
    if (output.data.length === 0) {
      logger.error(context, {
        message: 'No device data assigned to user (Atlas data for Aeon)',
      });
      return false;
    }
    const {data} = output;
    logger.info(context, {
      message: `AeonAuth Data response: ${JSON.stringify(data)}`,
    });

    // atlas returns a subset of data which first must be parsed
    const parsedData = JSON.parse(data[0].data);
    console.log(parsedData);

    const devices = parsedData.devices.device;
    const reference = parsedData.byd_acc_no;
    // console.log("ref",reference)

    return {
      devices,
      reference,
    };
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return devices
    return null;
  }
};
