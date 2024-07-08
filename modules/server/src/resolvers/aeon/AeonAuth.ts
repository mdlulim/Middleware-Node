// gets user aeon login details
// using atlas api calls
import axios from 'axios';
import {Context} from '../../Context';
import {createLogger} from '../../logging';
import {getTenant} from '../auth/tenant';
import config from '../../config';

const logger = createLogger('AeonAuth');

export const aeonAuth = async function (context: Context, appId: any) {
  try {
    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const authToken = context && context.req && context.req.headers.atlasauth;

    const uri = `${serverUrl}/api/v1/customer/external_system_reference?external_system_id=1`;

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
    // helpers to find specific primary and secondary devices
    const primary = parsedData.devices.device.find(
      (item: {type: string; serial_no: string}) => {
        return item.type === 'Primary';
      }
    );
    const secondary = parsedData.devices.device.find(
      (item: {type: string; serial_no: string}) => {
        return item.type === 'Secondary';
      }
    );

    // fetches primary device, else secondary
    const device = primary ? primary : secondary;

    // if no devices are attached to user, return false
    if (!device) {
      return false;
    }

    const deviceId = parsedData.device_id;

    return {
      deviceId,
      serialNum: device.serial_no,
      userPin: '011234',
      location: '',
      swVer: 'bluShift',
      account: parsedData.byd_acc_no,
    };
  } catch (error) {
    logger.error(context, {
      message: 'Error Getting Auth',
      error: error,
    });
    return false;
  }
};
