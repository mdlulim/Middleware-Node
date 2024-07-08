import {aeonConnect} from '../../AeonConnect';
import {MutationResolvers} from '../../../../generated/graphql';
import {aeonAuth} from '../../AeonAuth';
import {Context} from '../../../../Context';

/*
mutation {
  dataTopup(input: {code: 875, phoneNumber: "0829808881", network: "Vodacom", reference: "1234567890"}) {
    success
    message
  }
}
*/

//Invalid device
// const testData = {
//   deviceId: 29851,
//   serialNum: '123456',
//   userPin: '011234',
//   location: '',
//   swVer: 'bluShift',
// };

//Invalid user
// const testData = {
//   deviceId: 29851,
//   serialNum: 'P130189801394',
//   userPin: '654321',
//   location: '',
//   swVer: 'bluShift',
// };

export const dataTopup: MutationResolvers['dataTopup'] = async function (
  _parent: any,
  {input: {code, phoneNumber, network, reference, appId}},
  context: Context,
  _info: any
) {
  const trxType = network.replace('-', '') + 'Bundles';
  let data: any = {};
  try {
    const event = {
      AirtimePlus: 0,
      PhoneNumber: phoneNumber,
      Print: 0,
      ProductCode: code,
      Reference: reference,
    };
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    data = await aeonConnect(
      context,
      authData,
      // @ts-ignore
      trxType,
      'DoBundleTopup',
      event
    );

    return {success: true, message: data.message};
  } catch (e) {
    return {success: false, message: e.message};
  }
};
