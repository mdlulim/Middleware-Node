import {aeonConnect} from '../AeonConnect';
import {MutationResolvers} from '../../../generated/graphql';
import {printjobToJson} from '../printutil/PrintJobConverter';

/*
mutation {
  fmcgPayment (input: {
    name: "Lincy LDP",
    accountNumber: "EEE123288",
    bankingRef: "9847354BDF1000",
    amount: "100.00",
    outletAccount: "abcde",
    invoice: "abcde",
    driverMobile: "0835649200",
    productId: "1937"
    userInfo: {deviceId: "100000032", serial: "P13018CB01645", userPin: "011234", location: "", version: ""}
  }) {
    success
    message
    detail {
      amount
      transRef
      customerSlip
      merchantSlip
    }
  }
}
 */

export const fmcgPayment: MutationResolvers['fmcgPayment'] = async function (
  _parent: any,
  {
    input: {
      name,
      accountNumber,
      bankingRef,
      amount,
      outletAccount,
      invoice,
      driverMobile,
      productId,
      userInfo,
    },
  },
  context: any,
  _info: any
) {
  try {
    const authData = {
      deviceId: userInfo.deviceId,
      serialNum: userInfo.serial,
      userPin: userInfo.userPin,
      location: userInfo.location,
      swVer: userInfo.version,
    };

    console.log({authData});

    const event = {
      DistributorName: name,
      DistributorAccountNumber: accountNumber,
      DistributorBankingReferenceNumber: bankingRef,
      PaymentAmount: amount,
      OutletAccountNumber: outletAccount,
      InvoiceNumber: invoice,
      DriversCellphoneNumber: driverMobile,
      ProductId: productId,
    };

    const data: any = await aeonConnect(
      context,
      authData,
      'Supplier Payment',
      'FMCGPayment',
      event
    );

    return {
      success: true,
      message: data.message,
      detail: {
        amount: data.response.response.data.PaymentAmount,
        transRef: data.response.response.data.TransRef,
        customerSlip: JSON.stringify(
          printjobToJson(data.response.response.data.PrintLines)
        ),
        merchantSlip: JSON.stringify(
          printjobToJson(data.response.response.data.MerchantPrintLines)
        ),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e.message,
      detail: null,
    };
  }
};
