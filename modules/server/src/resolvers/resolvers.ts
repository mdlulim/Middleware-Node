import {fromGlobalId} from 'graphql-relay';

import {MutationResolvers, QueryResolvers} from '../generated/graphql';
import {authValidation} from './auth/AuthValidation.mutation';
//Import for legacy authentication (mainly for legacy voucher redemption code)
import {authValidationLegacy} from './auth/AuthValidationLegacy.mutation';
import {authRegistrationUser} from './auth/AuthRegistrationUser.mutation';
import {authRegistrationConsumer} from './auth/AuthRegistrationConsumer.mutation';
import {authResetPassword} from './auth/AuthResetPassword.mutation';
import {voucherRedemption} from './VoucherRedemption.mutation';
import {countries} from './auth/Countries';
import {identityTypes} from './auth/identityTypes';
import {busTicketCheckout} from './aeon/bus/BusTicketCheckout';
import {busTicketConfirm} from './aeon/bus/BusTicketConfirm';
import {paymentMethods} from './auth/PaymentMethods';
import {profile} from './auth/Profile';
import {carriers} from './aeon/bus/Carriers';
import {airtimeTopup} from './aeon/vas/airtime/AirtimeTopup.mutation';
import {dataBundles} from './aeon/vas/data/DataBundles';
import {dataBundlesNetwork} from './aeon/vas/data/DataBundlesNetwork';
import {dataTopup} from './aeon/vas/data/DataTopup.mutation';
import {stops} from './aeon/bus/Stops';
import {confirmMeter} from './aeon/vas/electricity/ConfirmMeter.mutation';
import {electricityTopup} from './aeon/vas/electricity/ElectricityTopup.mutation';
import {networks} from './network/Networks';
import {tickets} from './aeon/bus/Tickets';
import {ricaRegister} from './rica/RicaRegister.mutation';
import {account} from './aeon/account/Account';
import {accountNew} from './aeon/account/AccountNew';
import {transactions} from './aeon/account/Transactions';
import {commissions} from './aeon/account/Commissions';
import {fetchBanners} from './mendix/FetchMendixBanners';
import {fetchBannersNew} from './mendix/FetchMendixBannersNew';
import {svcValidate} from './aeon/bus/SvcValidate';
import {destinations} from './aeon/bus/Destinations';
import {fares} from './aeon/bus/Fares';
import {bankDetails} from './aeon/account/BankDetails';
import {bankDetailsNew} from './aeon/account/BankDetailsNew';
import {productsByNetwork} from './atlas/stock/ProductsByNetwork';
import {repTransfer} from './atlas/stock/RepTransfer.mutation';
import {customerList} from './atlas/customer/CustomerList';
import {productDeals} from './atlas/customer/ProductDeals';
import {addNetworkContract} from './atlas/customer/AddNetworkContract.mutation';
import {addProductDeal} from './atlas/customer/AddProductDeal.mutation';
import {customerOrder} from './atlas/stock/CustomerOrder.mutation';
import {allocateStock} from './atlas/stock/AllocateStock.mutation';
import {validateProduct} from './atlas/stock/ValidateProduct';
import {stockList} from './atlas/stock/StockList';
import {stockListNew} from './atlas/stock/StockListNew';
import {stockToReceive} from './atlas/stock/StockToReceive';
import {stockToReceiveNew} from './atlas/stock/StockToReceiveNew';
import {receiveStock} from './atlas/stock/ReceiveStock.mutation';
import {receiveStockNew} from './atlas/stock/ReceiveStockNew.mutation';
import {uploadSignature} from './registration/UploadSignature.mutation';
import {uploadSelfie} from './registration/UploadSelfie.mutation';
import {uploadId} from './registration/UploadId.mutation';
import {uploadProofOfResidence} from './registration/UploadProofOfResidence.mutation';
import {registerConsumer} from './registration/RegisterConsumer.mutation';

import {msisdnValidation} from './aeon/international-airtime/MSISDNValidation.mutation';
import {internationalAirtimeTopup} from './aeon/international-airtime/InternationalAirtimeTopup.mutation';
import {internationalBundleTopup} from './aeon/international-airtime/InternationalBundleTopup.mutation';
import {internationalAirtimeReprint} from './aeon/international-airtime/InternationalAirtimeReprint.mutation';
import {userPerformance} from './atlas/stock/UserPerformance';
import {fmcgDistributor} from './aeon/fmcg/FmcgDistributorLookup';
import {fmcgPayment} from './aeon/fmcg/FmcgPayment.mutation';
import {fmcgSuppliers} from './aeon/fmcg/FmcgSuppliers';
import {fmcgTransactionHistory} from './aeon/fmcg/FMCGTransactionHistory';
import {fmcgPrintTransactionHistory} from './aeon/fmcg/FMCGPrintTransactionHistory';
import {setPrintedAndTender} from './aeon/SetPrintedAndTender.mutation';
import {busTicketCancel} from './aeon/bus/BusTicketCancel';
import {busTicketCancelConfirm} from './aeon/bus/BusTicketCancelConfirm';
import {busUpdateCustomer} from './aeon/bus/BusUpdateCustomer.mutation';
import {getCustomer} from './aeon/bus/GetCustomer.mutation';
import {passTypes} from './aeon/bus/PassTypes';
import {ticketLookUp} from './aeon/bus/BusTicketLookUp';
import {passesLookUp} from './aeon/bus/BusPassesLookUp';
import {passPricesLookUp} from './aeon/bus/BusPassPricesLookUp';
import {validateBatch} from './atlas/stock/ValidateBatch.mutation';
import {getDevices} from './auth/GetDeviceList';

import {addDevice} from './registration/AddDevice.mutation';

import {registerConsumerByd} from './registration/RegisterConsumerByd';
import {customerListNew} from './atlas/customer/CustomerListNew';

import {agentRequest} from './atlas/customer/AgentRequest.mutation';

import {merchantToMerchant} from './aeon/merchant-to-merchant/MerchantToMerchant';
import {merchantToMerchantTransfer} from './aeon/merchant-to-merchant/MerchantToMerchantTransfer.mutation';
import {consumerProfile} from './atlas/customer/ConsumerProfile';
import {updateNetworkContract} from './atlas/customer/UpdateNetworkContract.mutation';
import {sellStock} from './atlas/customer/SellStock.mutation';

/*vouchers*/
/*voucher*/
import {merchantOrder} from './atlas/vouchers/MerchantOrder.mutation';
import {salesOrderList} from './atlas/vouchers/SalesOrderList';
import {productByEntity} from './atlas/vouchers/ProductByEntity';
import {verifyStockReceived} from './atlas/vouchers/VerifyStockReceived.mutation';
import {activateVoucher} from './atlas/vouchers/ActivateVouchers.mutation';
import {validateBox} from './atlas/vouchers/ValidateBox';
import {checkVoucherInfo} from './atlas/vouchers/CheckVoucherInfo.mutation';
import {checkStockInfo} from './atlas/stock/CheckStockInfo.mutation';
/* AMS */
/**
 *  AMS
 *  */
import {accountBalance} from './ams/account/AccountBalance';
import {accountTransactions} from './ams/account/Transactions';
import {productsList} from './atlas/vouchers/GetProductList';

/**
 *  AMS END
 *  */
/**
 *  betting
 *  */
import {voucherList} from './aeon/voucher/VoucherList';
import {vouchersTopUp} from './aeon/voucher/VouchersTopUp.mutation';
import {uploadDocument} from './registration/UploadDocument.mutation';
import {registerAgent} from './atlas/customer/RegisterAgent';
import {customerContracts} from './atlas/stock/CustomerContracts';
import {vodaPayLookup} from './vodapay/VodaPayLookUpOrder';
import {vodaPayRedeem} from './vodapay/VodaPayRedeemOrder';
import {vodaPayConfirmRedeem} from './vodapay/VodaPayConfirmRedeem';
import {vodaPayReverseRedeem} from './vodapay/VodaPayReverseRedeem';
import {activationHistory} from './atlas/vouchers/ActivationHistory';

/**
 *  betting END
 *  */

//TODO:
// AUTH?
// MSISDN Validation
// Int Airtime Topup
// Int Airtime Bundle
// Reprint
// Reversal

//@ts-ignore
const Query: QueryResolvers = {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
  // @ts-ignore
  node(_parent, {id}, _context, _info) {
    const resolvedId = fromGlobalId(id);

    // TODO: lookup

    return {
      id: resolvedId.id,
      __resolveType: resolvedId.type,
    };
  },
  account,
  accountNew,
  bankDetails,
  bankDetailsNew,
  carriers,
  ticketLookUp,
  passesLookUp,
  passPricesLookUp,
  commissions,
  countries,
  customerList,
  customerListNew,
  dataBundles,
  dataBundlesNetwork,
  destinations,
  fares,
  passTypes,
  fetchBanners,
  fetchBannersNew,
  fmcgDistributor,
  fmcgSuppliers,
  fmcgTransactionHistory,
  fmcgPrintTransactionHistory,
  identityTypes,
  networks,
  paymentMethods,
  productDeals,
  productsByNetwork,
  profile,
  stockList,
  stockListNew,
  stockToReceive,
  stockToReceiveNew,
  stops,
  svcValidate,
  tickets,
  transactions,
  userPerformance,
  validateProduct,
  getDevices,
  salesOrderList,
  accountBalance,
  accountTransactions,
  productByEntity,
  productsList,
  validateBox,
  voucherList,
  merchantToMerchant,
  activationHistory,
  customerContracts,
};

const Mutation: MutationResolvers = {
  addNetworkContract,
  addProductDeal,
  airtimeTopup,
  allocateStock,
  authValidation,
  authValidationLegacy,
  authResetPassword,
  authRegistrationUser,
  authRegistrationConsumer,
  getCustomer,
  busUpdateCustomer,
  busTicketCheckout,
  busTicketConfirm,
  busTicketCancel,
  busTicketCancelConfirm,
  confirmMeter,
  customerOrder,
  dataTopup,
  electricityTopup,
  msisdnValidation,
  fmcgPayment,
  internationalAirtimeTopup,
  internationalBundleTopup,
  internationalAirtimeReprint,
  receiveStock,
  receiveStockNew,
  validateBatch,
  registerConsumer,
  registerConsumerByd,
  repTransfer,
  ricaRegister,
  setPrintedAndTender,
  uploadId,
  uploadProofOfResidence,
  uploadSelfie,
  uploadSignature,
  voucherRedemption,
  addDevice,
  merchantOrder,
  verifyStockReceived,
  activateVoucher,
  checkVoucherInfo,
  checkStockInfo,
  vouchersTopUp,
  merchantToMerchantTransfer,
  agentRequest,
  consumerProfile,
  uploadDocument,
  registerAgent,
  vodaPayLookup,
  vodaPayRedeem,
  vodaPayConfirmRedeem,
  vodaPayReverseRedeem,
  updateNetworkContract,
  sellStock,
};

export const resolvers = {
  Query,
  Mutation,
};
