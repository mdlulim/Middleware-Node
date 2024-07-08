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

interface Input {
  input: {
    amount: string;
    phoneNumber: string;
    network: 'CellC' | 'IPay' | 'MTN' | 'Vodacom' | 'C-Connect';
    reference: string;
    appId: any;
  };
}

//@ts-ignore
export const airtimeTopup: MutationResolvers['airtimeTopup'] = async function (
  _parent: any,
  //ts-ignore
  {input: {amount, phoneNumber, network, reference, appId}}: Input,
  context: Context,
  _info: any
) {
  const authData = await aeonAuth(context, appId);
  if (!authData) {
    return null;
  }
  let data: any = {};
  try {
    const event = {
      AirtimePlus: 0,
      Amount: amount,
      PhoneNumber: phoneNumber,
      Print: 0,
      Reference: reference,
      SupplierName: 'supplier',
    };

    //Amount too low error
    // const event = {
    //   AirtimePlus: 0,
    //   Amount: -10,
    //   PhoneNumber: '0736549000',
    //   Print: 0,
    //   Reference: '29853_1600843228610',
    //   SupplierName: 'supplier',
    // };

    //Invalid phone number
    // const event = {
    //   AirtimePlus: 0,
    //   Amount: 10,
    //   PhoneNumber: '0821231234',
    //   Print: 0,
    //   Reference: '29853_1600843228610',
    //   SupplierName: 'supplier',
    // };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    data = await aeonConnect(
      context,
      authData,
      network == 'C-Connect' ? 'CCONNECT' : network,
      'GetTopup',
      event
    );

    return {success: true, message: data.message};
  } catch (e) {
    return {success: false, message: e.message};
  }
};
