import got from 'got';
import {MutationResolvers} from '../../generated/graphql';
import getAccessToken, {getURL} from './VodaPayUtil';
import config from '../../config';

export const vodaPayLookup: MutationResolvers['vodaPayLookup'] = async function (
  _parent: any,
  {
    input: {
      orderRedeemRef,
      devUserId,
      userPin,
      requestId,
      serialNumber,
      deviceId,
      deviceUUID,
      merchantEntityId,
    },
  },
  _info: any
) {
  const token = await getAccessToken();

  const url = getURL() + config.get('vodaPay.lookUpSubPath');
  console.log('URL for Vodapay lookup: ', url);
  return got
    .post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        orderRedeemRef: orderRedeemRef,
        devUserId: devUserId,
        userPin: userPin,
        requestId: requestId,
        serialNumber: serialNumber,
        deviceId: deviceId,
        deviceUUID: deviceUUID,
        merchantEntityId: merchantEntityId,
      },
    })
    .text();
};
