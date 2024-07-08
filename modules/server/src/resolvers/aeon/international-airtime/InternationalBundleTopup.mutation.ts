import {aeonConnect} from '../AeonConnect';
import {IaAuth, MutationResolvers} from '../../../generated/graphql';
import {printjobToJson} from '../printutil/PrintJobConverter';
import {Context} from '../../../Context';

interface Input {
  input: {
    phoneNumber: string;
    network: 'MTN' | 'Vodacom' | 'CellC' | 'IPay';
    reference: string;
    senderPhoneNumber: string;
    productCode: string;
    iaAuth: IaAuth;
    amount: string;
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
export const internationalBundleTopup: MutationResolvers['internationalBundleTopup'] = async function (
  _parent: any,
  {
    input: {
      phoneNumber,
      senderPhoneNumber,
      productCode,
      iaAuth,
      auth,
      network,
      amount,
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
      PhoneNumber: phoneNumber,
      SenderPhoneNumber: senderPhoneNumber,
      Network: network,
      Amount: amount,
      ProductCode: productCode,
      Print: 1,
    };
    data = await aeonConnect(
      context,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      auth,
      iaAuth.transType,
      'DoGlobalBundleTopup',
      event
    );
    const output = data.response.response.data;

    return {
      success: true,
      message: 'Success',
      data: {
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
      },
    };
  } catch (e) {
    console.log({e});
    return {success: false, message: e.message};
  }
};
