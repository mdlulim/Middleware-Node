import got from 'got';
import {MutationResolvers} from '../../generated/graphql';
import getAccessToken, {getURL} from './VodaPayUtil';
import config from '../../config';

export const vodaPayReverseRedeem: MutationResolvers['vodaPayReverseRedeem'] = async function (
  _parent: any,
  {
    input: {
      id,
      orderRedeemRef,
      devUserId,
      userPin,
      requestId,
      serialNumber,
      deviceId,
      deviceUUID,
      merchantEntityId,
      merchantTrxId,
      providerTrxId,
      amount,
      merchantName,
    },
  },
  // context: Context,
  _info: any
) {
  const token = await getAccessToken();

  const url = getURL() + config.get('vodaPay.reverseRedeemSubPath');
  console.log('URL for Vodapay reverse: ', url);
  return got
    .post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        id: id,
        amount: amount,
        orderRedeemRef: orderRedeemRef,
        merchantName: merchantName,
        merchantTrxId: merchantTrxId,
        providerTrxId: providerTrxId,
        merchantEntityId: merchantEntityId,
        devUserId: devUserId,
        userPin: userPin,
        requestId: requestId,
        serialNumber: serialNumber,
        deviceId: deviceId,
        deviceUUID: deviceUUID,
      },
    })
    .text();
};
