import {aeonConnect} from '../AeonConnect';
import {IaAuth, MutationResolvers} from '../../../generated/graphql';
import {printjobToJson} from '../printutil/PrintJobConverter';
import {Context} from '../../../Context';

interface Input {
  input: {
    phoneNumber: string;
    transRef: string;
    origReference: string;
    iaAuth: IaAuth;
    auth: {
      deviceId: string;
      transType: string;
      userPin: string;
      deviceSer: string;
      deviceUUID: string;
      reference: string;
    };
  };
}

//@ts-ignore
export const internationalAirtimeReprint: MutationResolvers['internationalAirtimeReprint'] = async function (
  _parent: any,
  {input: {iaAuth, auth, transRef, origReference, phoneNumber}}: Input,
  context: Context,
  _info: any
) {
  let data: any = {};
  try {
    const event = {
      UserPin: iaAuth.userPin,
      DeviceId: iaAuth.deviceId,
      DeviceSer: iaAuth.deviceSer,
      DeviceUUID: iaAuth.deviceUUID,
      TransType: iaAuth.transType,
      Reference: iaAuth.reference,
      Ref: iaAuth.reference,
      PhoneNumber: phoneNumber,
      TransRef: transRef,
      OrigReference: origReference,
      Print: 1,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    data = await aeonConnect(context, auth, iaAuth.network, 'Reprint', event);
    const output = data.response.response.data;

    return {
      transRef: output.TransRef,
      origReference: output.OrigReference,
      phoneNumber: output.PhoneNumber,
      tenderAmount: output.TenderAmount,
      tenderVat: output.TenderVat,
      receiveAmount: output.ReceiveAmount,
      date: output.Date,
      productCode: output.ProductCode,
      reference: output.Reference,
      printLines: JSON.stringify(
        printjobToJson(data.response.response.data.PrintLines)
      ),
      merchantPrintLines: JSON.stringify(
        printjobToJson(data.response.response.data.MerchantPrintLines)
      ),
    };
  } catch (e) {
    console.log({e});
    return {success: false, message: e.message};
  }
};
