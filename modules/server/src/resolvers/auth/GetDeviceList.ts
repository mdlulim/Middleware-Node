import axios from 'axios';
import config from '../../config';
import {QueryResolvers} from '../../generated/graphql';
import {createLogger} from '../../logging';

/*
query {
  getDevices {
    total
    edges {
      cursor
      node {
        id
		type
		 serialNo
      }
    }
  }
}
*/

const logger = createLogger('getDevices');

interface Device {
  id: string;
  type: string;
  serial_no: string;
}

// @ts-ignore
export const getDevices: QueryResolvers['getDevices'] = async function (
  _parent: any,
  _input: any,
  context: any,
  _info: any
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;

    const uri = `${config.get(
      'atlasAddress'
    )}/api/v1/customer/external_system_reference?external_system_id=1`;

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

    const devices = parsedData.devices.device;
    const ref = parsedData.byd_acc_no;
    console.log('ref', ref);

    const devicesOutput = devices.map((device: Device, index: number) => {
      return {
        cursor: Buffer.from('Device:' + index).toString('base64'),
        node: {
          id: Buffer.from('Device:' + index).toString('base64'),
          type: device.type,
          serialNo: device.serial_no,
          bydNo: ref,
        },
      };
    });

    return {
      total: devicesOutput.length,
      edges: devicesOutput,
    };
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
};
