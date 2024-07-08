import got from 'got';
import {MutationResolvers} from '../../generated/graphql';
import getAccessToken, {getURL} from './VodaPayUtil';
import config from '../../config';

export const vodaPayRedeem: MutationResolvers['vodaPayRedeem'] = async function (
  _parent: any,
  {
    input: {
      amount,
      secretCode,
      orderRedeemRef,
      devUserId,
      userPin,
      requestId,
      serialNumber,
      deviceId,
      deviceUUID,
      merchantTrxId,
      providerTrxId,
      merchantEntityId,
      merchantName,
    },
  },
  _info: any
) {
  const token = await getAccessToken();

  const url = getURL() + config.get('vodaPay.redeemSubPath');
  console.log('URL for Vodapay confirm: ', url);

  return got
    .post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        orderRedeemRef: orderRedeemRef,
        amount: amount,
        merchantName: merchantName,
        merchantTrxId: merchantTrxId,
        providerTrxId: providerTrxId,
        merchantEntityId: merchantEntityId,
        secretCode: secretCode,
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
