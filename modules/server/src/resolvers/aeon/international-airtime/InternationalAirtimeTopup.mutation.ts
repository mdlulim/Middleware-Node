import {aeonConnect} from '../AeonConnect';
import {IaAuth, MutationResolvers} from '../../../generated/graphql';
import {printjobToJson} from '../printutil/PrintJobConverter';
import {Context} from '../../../Context';

interface Input {
  input: {
    amount: string;
    phoneNumber: string;
    network: 'MTN' | 'Vodacom' | 'CellC' | 'IPay';
    reference: string;
    senderPhoneNumber: string;
    productCode: string;
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
export const internationalAirtimeTopup: MutationResolvers['internationalAirtimeTopup'] = async function (
  _parent: any,
  {
    input: {
      amount,
      phoneNumber,
      network,
      senderPhoneNumber,
      productCode,
      iaAuth,
      auth,
    },
  }: Input,
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
      Amount: amount,
      PhoneNumber: phoneNumber,
      // SupplierName: 'supplier',
      SenderPhoneNumber: senderPhoneNumber,
      ProductCode: productCode,
      Network: network,
      Print: 1,
    };
    data = await aeonConnect(
      context,
      // todo: fix the type errors
      // @ts-ignore
      auth,
      // @ts-ignore
      iaAuth.network,
      'GetGlobalTopup',
      event
    );
    const output = data.response.response.data;

    return {
      transRef: output.TransRef,
      supplierName: output.SupplierName,
      phoneNumber: output.PhoneNumber,
      tenderAmount: output.TenderAmount,
      tenderVat: output.TenderVat,
      receiveAmount: output.ReceiveAmount,
      ref: output.Ref,
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
