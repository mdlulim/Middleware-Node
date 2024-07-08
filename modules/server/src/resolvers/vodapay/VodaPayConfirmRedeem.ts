import got from 'got';
import {MutationResolvers} from '../../generated/graphql';
import getAccessToken, {getURL} from './VodaPayUtil';
import config from '../../config';

export const vodaPayConfirmRedeem: MutationResolvers['vodaPayConfirmRedeem'] = async function (
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
  _info: any
) {
  const token = await getAccessToken();

  const url = getURL() + config.get('vodaPay.confirmRedeemSubPath');
  console.log('URL for Vodapay confirm: ', url);
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
