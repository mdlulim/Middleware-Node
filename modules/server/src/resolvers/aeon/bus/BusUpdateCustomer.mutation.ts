import {aeonConnect} from '../AeonConnect';
import {
  BusUpdateCustomerInput,
  MutationResolvers,
} from '../../../generated/graphql';

/*mutation {
  busUpdateCustomer(input:
  {
    uid: "2B4C8923FC8804",
    name: "Boitshoko",
    surname: "Test 2.7",
    cellNumber: "0711231234"
    status: "1",
    auth: {
        deviceId: "29721",
        serialNum: "P130189B00366",
        userPin: "011234",
        location: "",
        swVer: ""
  }
  }) {
    status
    success
    message
  }
}*/

interface Input {
  input: BusUpdateCustomerInput;
}

export const busUpdateCustomer: MutationResolvers['BusUpdateCustomer'] = async function (
  _parent: any,
  {input}: Input,
  context: any,
  _info: any
) {
  const {uid, name, surname, cellNumber, status, auth} = input;
  let data: any = {};
  try {
    const event = {
      uid: uid,
      name: name,
      surname: surname,
      cell_number: cellNumber,
      status: status,
    };

    if (!auth) {
      return {success: false, message: data.message};
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    data = await aeonConnect(
      context,
      auth,
      'NFCSmartTap',
      'UpdateCustomer',
      event
    );
    const output = data.response.response;
    return {
      success: true,
      message: output.ResponseMessage.message,
      status: output.ResponseMessage.status,
    };
  } catch (e) {
    console.log({e});
    return {success: false, message: e.message};
  }
};
