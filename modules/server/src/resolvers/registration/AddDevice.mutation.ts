import axios from 'axios';
import {updateExternalSystemReference} from '../atlas/customer/ExternalSystemReference';
import {Context} from '../../Context';
import {createLogger} from '../../logging';
import {MutationResolvers} from '../../generated/graphql';
import {getTenant} from '../auth/tenant';
import config from '../../config';

export const addDevice: MutationResolvers['addDevice'] = async function (
  _parent: any,
  {input: {serialNo, appId}},
  context: Context
) {
  try {
    const logger = createLogger('AddDevice');

    const authToken = context && context.req && context.req.headers.atlasauth;

    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }

    const uri = `${serverUrl}/api/v1/customer/external_system_reference?external_system_id=1`;

    const output = await axios
      .get(uri, {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then(function (response: {data: any}) {
        logger.info(context, {
          message: `AeonAuth response: ${response}`,
        });
        return response.data;
      })
      .catch(function (error: any) {
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
      return {success: false, message: 'Unable to get AEON data'};
    }
    if (output.data.length === 0) {
      logger.error(context, {
        message: 'No device data assigned to user (Atlas data for Aeon)',
      });
      return {
        success: false,
        message: 'No device data assigned to user (Atlas data for Aeon)',
      };
    }
    const {data} = output;
    logger.info(context, {
      message: `AeonAuth Data response: ${JSON.stringify(data)}`,
    });

    // atlas returns a subset of data which first must be parsed

    const headers = {headers: {authorization: `${authToken}`}};

    const id = JSON.parse(data[0].id);

    const parsedData = JSON.parse(data[0].data);
    const devices = parsedData.devices.device;
    const deviceId = parsedData.device_id;
    const byd_acc_no = parsedData.byd_acc_no;

    let count = 0;
    let aeonDetail = '{ "devices":{ "device" : [';

    while (count < devices.length) {
      aeonDetail +=
        '{"type": "' +
        devices[count].type +
        '", "serial_no":"' +
        devices[count].serial_no +
        '"},';
      count++;
    }

    aeonDetail +=
      '{"type":"Secondary","serial_no":"' +
      serialNo +
      '"}]},"device_id": "' +
      deviceId +
      '","byd_acc_no":"' +
      byd_acc_no +
      '"}';

    aeonDetail = JSON.stringify(aeonDetail);

    aeonDetail = aeonDetail.replace(' ', ''); // remove spaces
    aeonDetail = aeonDetail.replace('\t', ''); // remove tabs
    aeonDetail = aeonDetail.replace('\n', ''); // remove new lines
    aeonDetail = aeonDetail.replace('\r', '');

    const aeonDetailUploadResult = await updateExternalSystemReference(
      context,
      headers,
      id,
      byd_acc_no,
      JSON.parse(aeonDetail),
      appId
    );
    if (!aeonDetailUploadResult) {
      return {
        success: false,
        message: 'Unable to save Account details',
      };
    }

    return {
      success: true,
      message: 'Success',
    };
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
