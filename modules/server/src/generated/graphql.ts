/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../Context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};


export type Account = {
  __typename?: 'Account';
  balance: Scalars['Float'];
  profit: Scalars['Float'];
  accountNumber: Scalars['String'];
};

export type AccountBalance = {
  __typename?: 'AccountBalance';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  balance: Scalars['Float'];
  currentBalance: Scalars['Float'];
  accountNo: Scalars['Float'];
};

export type AccountNew = {
  __typename?: 'AccountNew';
  balance: Scalars['Float'];
  profit: Scalars['Float'];
  accountNumber: Scalars['String'];
};

export type AccountNewInput = {
  appId: Maybe<Scalars['String']>;
};

export type AccountRegisterConsumerInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  identityReference: Scalars['String'];
  identityReferenceExpiryDate: Scalars['String'];
  identityReferenceOriginCountry: Scalars['String'];
  identityTypeId: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  paymentMethodId: Scalars['String'];
  username: Scalars['String'];
};

export type AccountRegisterConsumerPayload = {
  __typename?: 'AccountRegisterConsumerPayload';
  createdAt: Maybe<Scalars['String']>;
  groupId: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  identityReference: Maybe<Scalars['String']>;
  identityReferenceExpiryDate: Maybe<Scalars['String']>;
  identityReferenceOriginCountry: Maybe<Scalars['String']>;
  identityTypeId: Maybe<Scalars['String']>;
  isActive: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  output: Maybe<Scalars['String']>;
  paymentMethodId: Maybe<Scalars['String']>;
  repUserId: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  updatedAt: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['String']>;
  vatRegistered: Maybe<Scalars['String']>;
};

export type AccountRegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userTypeId: Scalars['String'];
  username: Scalars['String'];
};

export type AccountRegisterUserPayload = {
  __typename?: 'AccountRegisterUserPayload';
  success: Scalars['Boolean'];
};

export type AccountTransactions = {
  __typename?: 'AccountTransactions';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<AccountTransactionsEdge>>;
  totalCount: Scalars['Int'];
};

export type AccountTransactionsEdge = {
  __typename?: 'AccountTransactionsEdge';
  node: Transactions;
  cursor: Scalars['String'];
};

export type AccountTransactionsInput = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};

export type ActivateStock = {
  barcode: Array<Scalars['String']>;
};

export type ActivateVoucherInput = {
  order: Array<ActivateStock>;
  appId: Maybe<Scalars['String']>;
};

export type ActivateVoucherResult = {
  __typename?: 'ActivateVoucherResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type ActivationHistoryEdge = {
  __typename?: 'ActivationHistoryEdge';
  node: Activations;
  cursor: Scalars['String'];
};

export type ActivationHistoryInput = {
  appId: Scalars['String'];
  invoiceNo: Scalars['String'];
};

export type ActivationHistoryResult = {
  __typename?: 'ActivationHistoryResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<ActivationHistoryEdge>>;
  totalCount: Scalars['Int'];
};

export type Activations = {
  __typename?: 'Activations';
  id: Scalars['String'];
  box: Scalars['String'];
  price: Maybe<Scalars['String']>;
};

export type AddDeviceInput = {
  serialNo: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type AddDeviceResult = {
  __typename?: 'AddDeviceResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type AddNetworkContractInput = {
  name: Scalars['String'];
  customerId: Scalars['Int'];
  network: NetworkEnum;
  isTiered: Maybe<Scalars['Boolean']>;
  isSplit: Maybe<Scalars['Boolean']>;
  ogr: Scalars['Float'];
  act: Scalars['Float'];
  sim: Scalars['Float'];
  appId: Maybe<Scalars['String']>;
};

export type AddNetworkContractResult = {
  __typename?: 'AddNetworkContractResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type AddProductDealInput = {
  productId: Scalars['Int'];
  customerId: Scalars['Int'];
  name: Scalars['String'];
  ogr: Scalars['Float'];
  act: Scalars['Float'];
  sim: Scalars['Float'];
  appId: Maybe<Scalars['String']>;
};

export type AddProductDealResult = {
  __typename?: 'AddProductDealResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type AeonAuth = {
  __typename?: 'AeonAuth';
  authorized: Scalars['Boolean'];
  clientMutationId: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type AeonResult = {
  __typename?: 'AeonResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
  response: Maybe<Scalars['String']>;
};

export type AgentRequestInput = {
  appId: Maybe<Scalars['String']>;
};

export type AgentRequestResult = {
  __typename?: 'AgentRequestResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type AirtimeTopupInput = {
  amount: Scalars['String'];
  phoneNumber: Scalars['String'];
  network: Scalars['String'];
  reference: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type AirtimeTopupResult = {
  __typename?: 'AirtimeTopupResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
};

export type AllocateStock = {
  product_id: Scalars['Int'];
  qty: Scalars['Int'];
  deal_id: Scalars['Int'];
  sale_price: Scalars['Float'];
  barcode: Array<Scalars['String']>;
};

export type AllocateStockInput = {
  stock: Array<AllocateStock>;
  customer_id: Scalars['Int'];
  delivery: DeliveryEnum;
  appId: Maybe<Scalars['String']>;
};

export type AllocateStockResult = {
  __typename?: 'AllocateStockResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type AuthResetPasswordInput = {
  method: ResetMethod;
  detail: Scalars['String'];
  clientMutationId: Maybe<Scalars['String']>;
  appId: Maybe<Scalars['String']>;
};

export type AuthResetPasswordPayload = {
  __typename?: 'AuthResetPasswordPayload';
  success: Scalars['Boolean'];
  clientMutationId: Maybe<Scalars['String']>;
};

export type AuthValidationInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  appId: Maybe<Scalars['String']>;
  currentStatus: Maybe<Scalars['Int']>;
  clientMutationId: Maybe<Scalars['String']>;
};

export type AuthValidationLegacyInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  clientMutationId: Maybe<Scalars['String']>;
};

export type AuthValidationLegacyPayload = {
  __typename?: 'AuthValidationLegacyPayload';
  authorized: Scalars['Boolean'];
  clientMutationId: Maybe<Scalars['String']>;
};

export type AuthValidationPayload = {
  __typename?: 'AuthValidationPayload';
  authorized: Scalars['Boolean'];
  token: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  profile: Maybe<Profile>;
  clientMutationId: Maybe<Scalars['String']>;
};

export type BankDetail = {
  __typename?: 'BankDetail';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bank: Scalars['String'];
  branch: Scalars['String'];
  branchCode: Scalars['String'];
  id: Scalars['ID'];
  reference: Scalars['String'];
  swift: Scalars['String'];
  universalCode: Scalars['String'];
};

export type BankDetails = {
  __typename?: 'BankDetails';
  edges: Maybe<Array<BankDetailsEdge>>;
  totalCount: Scalars['Int'];
};

export type BankDetailsEdge = {
  __typename?: 'BankDetailsEdge';
  cursor: Scalars['String'];
  node: BankDetail;
};

export type BankDetailsNew = {
  __typename?: 'BankDetailsNew';
  edges: Maybe<Array<BankDetailsEdge>>;
  totalCount: Scalars['Int'];
};

export type BankDetailsNewInput = {
  appId: Maybe<Scalars['String']>;
};

export type Banner = {
  __typename?: 'Banner';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type BannerEdge = {
  __typename?: 'BannerEdge';
  cursor: Scalars['String'];
  node: Banner;
};

export type BannerNewInput = {
  appId: Maybe<Scalars['String']>;
};

export type BannersResult = {
  __typename?: 'BannersResult';
  edges: Maybe<Array<BannerEdge>>;
  total: Scalars['Int'];
};

export type Bundle = {
  __typename?: 'Bundle';
  id: Scalars['ID'];
  network: Scalars['String'];
  category: Scalars['String'];
  desc: Scalars['String'];
  amount: Scalars['String'];
  code: Scalars['Int'];
};

export type BundleNetwork = {
  __typename?: 'BundleNetwork';
  category: Scalars['String'];
  desc: Scalars['String'];
  amount: Scalars['String'];
  code: Scalars['Int'];
};

export type BundlesEdge = {
  __typename?: 'BundlesEdge';
  node: Bundle;
  cursor: Scalars['String'];
};

export type BusAccount = {
  deviceId: Scalars['String'];
  serialNum: Scalars['String'];
  deviceUUID: Maybe<Scalars['String']>;
  userPin: Scalars['String'];
  location: Scalars['String'];
  swVer: Scalars['String'];
};

export type BusCarrierLocation = {
  __typename?: 'BusCarrierLocation';
  name: Maybe<Scalars['String']>;
  shortName: Maybe<Scalars['String']>;
  companyId: Maybe<Scalars['String']>;
  role: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

export type BusCarriersConnection = {
  __typename?: 'BusCarriersConnection';
  companiesEdges: Array<BusCarriersEdge>;
  passTypesEdges: Array<BusPassTypeEdge>;
  pageInfo: Maybe<PageInfo>;
  companiesCount: Maybe<Scalars['Int']>;
  passTypesCount: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  message: Scalars['String'];
  status: Scalars['String'];
};

export type BusCarriersEdge = {
  __typename?: 'BusCarriersEdge';
  node: BusCarrierLocation;
  cursor: Maybe<Scalars['String']>;
};

export type BusCustomerInfo = {
  __typename?: 'BusCustomerInfo';
  uid: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  surname: Maybe<Scalars['String']>;
  cellNumber: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  issueDate: Maybe<Scalars['String']>;
  expiry: Maybe<Scalars['String']>;
};

export type BusDestinationLocation = {
  __typename?: 'BusDestinationLocation';
  locationId: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  stationId: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  entityId: Maybe<Scalars['String']>;
};

export type BusDestinationsConnection = {
  __typename?: 'BusDestinationsConnection';
  edges: Array<BusDestinationsEdge>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type BusDestinationsEdge = {
  __typename?: 'BusDestinationsEdge';
  node: BusDestinationLocation;
  cursor: Maybe<Scalars['String']>;
};

export type BusFare = {
  __typename?: 'BusFare';
  id: Maybe<Scalars['ID']>;
  period: Scalars['String'];
  fareProductId: Scalars['String'];
  code: Scalars['String'];
  routes: RouteRecursor;
  companyId: Scalars['ID'];
  weekdays: Scalars['String'];
  created: Scalars['DateTime'];
  availableFrom: Scalars['DateTime'];
  availableTo: Scalars['DateTime'];
  transferCount: Scalars['Int'];
  passValue: Scalars['Int'];
  tripsPerDay: Scalars['Int'];
  passType: Scalars['String'];
  price: Scalars['String'];
  name: Scalars['String'];
  shortName: Scalars['String'];
  desc: Maybe<Scalars['String']>;
};

export type BusFareInput = {
  companyId: Scalars['String'];
  departureLocationId: Maybe<Scalars['ID']>;
  destinationLocationId: Maybe<Scalars['ID']>;
  routeId: Maybe<Scalars['Int']>;
  fareProductId: Maybe<Scalars['ID']>;
  auth: Maybe<BusAccount>;
};

export type BusFaresConnection = {
  __typename?: 'BusFaresConnection';
  totalAmount: Maybe<Scalars['Int']>;
  edges: Maybe<Array<BusFaresEdge>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
  status: Maybe<Scalars['Int']>;
  sessionId: Maybe<Scalars['String']>;
  responseCode: Maybe<Scalars['Int']>;
  responseMessage: Maybe<Scalars['String']>;
};

export type BusFaresEdge = {
  __typename?: 'BusFaresEdge';
  node: BusFare;
  cursor: Maybe<Scalars['String']>;
};

export type BusGetCustomerInput = {
  uid: Scalars['String'];
  auth: BusAccount;
};

export type BusGetCustomerPayload = {
  __typename?: 'BusGetCustomerPayload';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  customerInfo: BusCustomerInfo;
  pageNumber: Maybe<Scalars['Int']>;
  totalPages: Maybe<Scalars['Int']>;
  maxRecordsPerPage: Maybe<Scalars['Int']>;
  recordsFetched: Maybe<Scalars['Int']>;
};

export type BusLocation = {
  __typename?: 'BusLocation';
  category: Maybe<Scalars['String']>;
  locationId: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  transfersAllowed: Maybe<Scalars['Int']>;
};

export type BusLocationEdge = {
  __typename?: 'BusLocationEdge';
  node: BusLocation;
  cursor: Maybe<Scalars['String']>;
};

export type BusPass = {
  __typename?: 'BusPass';
  activationRule: Maybe<Scalars['String']>;
  companyId: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  passId: Maybe<Scalars['String']>;
  passType: Maybe<Scalars['String']>;
  passValue: Maybe<Scalars['String']>;
  period: Maybe<Scalars['String']>;
  price: Maybe<Scalars['String']>;
  tripsPerDay: Maybe<Scalars['Int']>;
  weekdays: Maybe<Scalars['String']>;
};

export type BusPassEdge = {
  __typename?: 'BusPassEdge';
  node: BusPass;
  cursor: Maybe<Scalars['String']>;
};

export type BusPassPicesLookUpConnection = {
  __typename?: 'BusPassPicesLookUpConnection';
  edges: Array<BusPassPriceEdge>;
  totalCount: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  message: Scalars['String'];
  status: Scalars['String'];
};

export type BusPassPrice = {
  __typename?: 'BusPassPrice';
  passId: Maybe<Scalars['String']>;
  price: Maybe<Scalars['String']>;
  validFrom: Scalars['DateTime'];
  validTo: Scalars['DateTime'];
};

export type BusPassPriceEdge = {
  __typename?: 'BusPassPriceEdge';
  node: BusPassPrice;
  cursor: Maybe<Scalars['String']>;
};

export type BusPassPricesLookUpInput = {
  companyId: Scalars['String'];
  passId: Scalars['String'];
};

export type BusPassType = {
  __typename?: 'BusPassType';
  passTypeId: Maybe<Scalars['ID']>;
  passType: Scalars['String'];
};

export type BusPassTypeEdge = {
  __typename?: 'BusPassTypeEdge';
  node: BusPassType;
  cursor: Maybe<Scalars['String']>;
};

export type BusPassTypesConnection = {
  __typename?: 'BusPassTypesConnection';
  edges: Array<BusPassTypeEdge>;
  totalCount: Maybe<Scalars['Int']>;
};

export type BusPassesLookUpConnection = {
  __typename?: 'BusPassesLookUpConnection';
  edges: Array<BusPassEdge>;
  totalCount: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  message: Scalars['String'];
  status: Scalars['String'];
};

export type BusPassesLookUpInput = {
  ticketNumber: Maybe<Scalars['String']>;
};

export type BusStopLocation = {
  __typename?: 'BusStopLocation';
  id: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type BusStopsConnection = {
  __typename?: 'BusStopsConnection';
  edges: Array<BusStopsEdge>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type BusStopsEdge = {
  __typename?: 'BusStopsEdge';
  node: BusStopLocation;
  cursor: Maybe<Scalars['String']>;
};

export type BusStopsInput = {
  companyId: Scalars['ID'];
  auth: BusAccount;
};

export type BusTicket = {
  __typename?: 'BusTicket';
  id: Maybe<Scalars['ID']>;
  sessionId: Maybe<Scalars['String']>;
  responseCode: Maybe<Scalars['Int']>;
  responseMessage: Maybe<Scalars['String']>;
  companyId: Maybe<Scalars['Int']>;
  ticketId: Maybe<Scalars['Int']>;
  ticketNo: Maybe<Scalars['String']>;
  ticketType: Maybe<Scalars['String']>;
  ticketSaleId: Maybe<Scalars['Int']>;
  passId: Maybe<Scalars['Int']>;
  routes: Maybe<RouteRecursor>;
  fare: Maybe<Scalars['String']>;
  fareProductId: Maybe<Scalars['String']>;
  departureLocationId: Maybe<Scalars['String']>;
  destinationLocationId: Maybe<Scalars['String']>;
  activationDate: Maybe<Scalars['DateTime']>;
  expiryDate: Maybe<Scalars['DateTime']>;
  ticketDate: Maybe<Scalars['DateTime']>;
  numberOfDaysTrips: Maybe<Scalars['Int']>;
  numberOfTransfers: Maybe<Scalars['Int']>;
  status: Maybe<Scalars['String']>;
  rules: Maybe<Scalars['String']>;
  fareCurrency: Maybe<Scalars['String']>;
  locations: Maybe<Array<Maybe<BusTicketLocation>>>;
};

export type BusTicketCancelInput = {
  uid: Scalars['String'];
  transref: Scalars['String'];
  svcData: Array<Maybe<Sector>>;
  referenceId: Scalars['String'];
  status: Scalars['String'];
  ticketId: Scalars['String'];
  transactionId: Scalars['String'];
  auth: BusAccount;
};

export type BusTicketCancelPayload = {
  __typename?: 'BusTicketCancelPayload';
  svcData: Maybe<SvcUpdate>;
  ticket: Maybe<BusTicket>;
  transaction: Maybe<Transaction>;
  transref: Maybe<Scalars['String']>;
  responseMessage: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BusTicketCheckoutInput = {
  uid: Scalars['String'];
  ticketType: Scalars['String'];
  referenceId: Scalars['String'];
  passId: Scalars['String'];
  amount: Scalars['String'];
  companyId: Scalars['String'];
  svcData: Array<Maybe<Sector>>;
  auth: BusAccount;
};

export type BusTicketCheckoutPayload = {
  __typename?: 'BusTicketCheckoutPayload';
  svcData: Maybe<SvcUpdate>;
  ticket: Maybe<BusTicket>;
  transaction: Maybe<Transaction>;
  transref: Maybe<Scalars['String']>;
  message: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BusTicketConfirmCancelInput = {
  uid: Scalars['String'];
  transref: Scalars['String'];
  svcData: Array<Maybe<Sector>>;
  status: Scalars['String'];
  ticketId: Scalars['String'];
  transactionId: Scalars['String'];
  auth: BusAccount;
};

export type BusTicketConfirmCancelPayload = {
  __typename?: 'BusTicketConfirmCancelPayload';
  message: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  transref: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  svcData: Maybe<SvcUpdate>;
  ticket: Maybe<BusTicket>;
  transaction: Maybe<Transaction>;
  printLines: Maybe<Scalars['String']>;
  merchantPrintLines: Maybe<Scalars['String']>;
};

export type BusTicketConfirmInput = {
  transref: Scalars['String'];
  uid: Scalars['String'];
  status: Scalars['String'];
  ticketId: Scalars['String'];
  transactionId: Scalars['String'];
  amount: Scalars['String'];
  paymentType: Scalars['String'];
  companyId: Scalars['String'];
  svcData: Array<Maybe<Sector>>;
  auth: BusAccount;
};

export type BusTicketConfirmPayload = {
  __typename?: 'BusTicketConfirmPayload';
  message: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  status: Maybe<Scalars['String']>;
  svcData: Maybe<SvcUpdate>;
  ticket: Maybe<BusTicket>;
  transaction: Maybe<Transaction>;
  transref: Maybe<Scalars['String']>;
  printLines: Maybe<Scalars['String']>;
  merchantPrintLines: Maybe<Scalars['String']>;
};

export type BusTicketInput = {
  uid: Scalars['String'];
  ticketId: Maybe<Scalars['String']>;
};

export type BusTicketLocation = {
  __typename?: 'BusTicketLocation';
  location_id: Maybe<Scalars['String']>;
  location_name: Maybe<Scalars['String']>;
  transfer_allowed: Maybe<Scalars['Int']>;
};

export type BusTicketLookUpConnection = {
  __typename?: 'BusTicketLookUpConnection';
  passEdges: Maybe<Array<BusPassEdge>>;
  locationEdges: Maybe<Array<BusLocationEdge>>;
  availableFrom: Maybe<Scalars['DateTime']>;
  availableTo: Maybe<Scalars['DateTime']>;
  ticketId: Maybe<Scalars['ID']>;
  ticketNumber: Maybe<Scalars['String']>;
  transferValidityPeriodMinutes: Maybe<Scalars['String']>;
  noOfTransfers: Maybe<Scalars['Int']>;
  passCount: Maybe<Scalars['Int']>;
  locationCount: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  message: Scalars['String'];
  status: Scalars['String'];
};

export type BusTicketLookUpInput = {
  companyId: Maybe<Scalars['String']>;
  departureLocationId: Maybe<Scalars['ID']>;
  destinationLocationId: Maybe<Scalars['ID']>;
  passType: Maybe<Scalars['String']>;
  passId: Maybe<Scalars['String']>;
};

export type BusTicketsConnection = {
  __typename?: 'BusTicketsConnection';
  message: Scalars['String'];
  success: Scalars['Boolean'];
  edges: Maybe<Array<BusTicketsEdge>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type BusTicketsEdge = {
  __typename?: 'BusTicketsEdge';
  node: BusTicket;
  cursor: Maybe<Scalars['String']>;
};

export type BusTicketsEdges = {
  node: TicketBus;
  cursor: Maybe<Scalars['String']>;
};

export type BusTicketsRequest = {
  totalAmount: Scalars['Int'];
  edges: Array<BusTicketsEdges>;
  pageInfo: Maybe<Scalars['String']>;
  totalCount: Maybe<Scalars['Int']>;
};

export type BusUpdateCustomerInput = {
  uid: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
  cellNumber: Scalars['String'];
  status: Scalars['String'];
  auth: BusAccount;
};

export type BusUpdateCustomerPayload = {
  __typename?: 'BusUpdateCustomerPayload';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
};

export type Card = {
  __typename?: 'Card';
  type: Scalars['String'];
  card_number: Scalars['String'];
};

export type CheckStockInfoInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type CheckStockInfoResult = {
  __typename?: 'CheckStockInfoResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  product: Maybe<StockInfo>;
};

export type CheckVoucherInfoInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type CheckVoucherInfoResult = {
  __typename?: 'CheckVoucherInfoResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  product: Maybe<Details>;
};

export type Commission = {
  __typename?: 'Commission';
  id: Maybe<Scalars['ID']>;
  retail: Scalars['Float'];
  profit: Scalars['Float'];
  qty: Scalars['Int'];
  name: Scalars['String'];
};

export type CommissionEdge = {
  __typename?: 'CommissionEdge';
  node: Commission;
  cursor: Maybe<Scalars['String']>;
};

export type CommissionsConnection = {
  __typename?: 'CommissionsConnection';
  totalRetail: Scalars['Float'];
  totalProfit: Scalars['Float'];
  edges: Maybe<Array<CommissionEdge>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type CommissionsInput = {
  period: Period;
  appId: Maybe<Scalars['String']>;
};

export type ConfirmMeterDetail = {
  __typename?: 'ConfirmMeterDetail';
  transRef: Scalars['String'];
  customer: Scalars['String'];
  address: Scalars['String'];
  utility: Scalars['String'];
  trxTypeId: Scalars['Int'];
};

export type ConfirmMeterInput = {
  meterNumber: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type ConfirmMeterResult = {
  __typename?: 'ConfirmMeterResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  detail: Maybe<ConfirmMeterDetail>;
};

export type ConfirmRedeemInput = {
  id: Scalars['String'];
  merchantName: Scalars['String'];
  merchantTrxId: Scalars['String'];
  providerTrxId: Scalars['String'];
  merchantEntityId: Scalars['String'];
  amount: Scalars['Int'];
  orderRedeemRef: Scalars['String'];
  userPin: Scalars['String'];
  serialNumber: Scalars['String'];
  deviceUUID: Scalars['String'];
  devUserId: Scalars['String'];
  requestId: Scalars['String'];
  deviceId: Scalars['String'];
};

export type ConsumerProfileInput = {
  appId: Scalars['String'];
  custCode: Scalars['String'];
};

export type ConsumerProfileResult = {
  __typename?: 'ConsumerProfileResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  customerId: Maybe<Scalars['Int']>;
  username: Maybe<Scalars['String']>;
  names: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  identity_reference: Maybe<Scalars['String']>;
  cellNumber: Maybe<Scalars['String']>;
  address_line_1: Maybe<Scalars['String']>;
  address_line_2: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  postal_code: Maybe<Scalars['String']>;
  province: Maybe<Scalars['String']>;
  user_type: Maybe<Scalars['String']>;
  customer_status: Maybe<Scalars['String']>;
  payment_method: Maybe<Scalars['String']>;
  identity_type: Maybe<Scalars['String']>;
  images: Maybe<Array<Maybe<Images>>>;
};

export type Country = {
  __typename?: 'Country';
  abv: Scalars['String'];
  abv3: Scalars['String'];
  abv3_alt: Maybe<Scalars['String']>;
  code: Scalars['String'];
  created_at: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updated_at: Maybe<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  customerCode: Scalars['String'];
  customerId: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CustomerContractsInput = {
  appId: Scalars['String'];
  customerId: Scalars['Int'];
  network: Maybe<Scalars['String']>;
};

export type CustomerContractsResult = {
  __typename?: 'CustomerContractsResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  data: Maybe<Array<Maybe<Data>>>;
};

export type CustomerDetail = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  address: Scalars['String'];
  addressLine2: Maybe<Scalars['String']>;
  suburb: Scalars['String'];
  city: Scalars['String'];
  postCode: Scalars['String'];
  region: Scalars['String'];
  passportCountry: Scalars['String'];
};

export type CustomerList = {
  __typename?: 'CustomerList';
  edges: Maybe<Array<CustomerListEdge>>;
  totalCount: Scalars['Int'];
};

export type CustomerListEdge = {
  __typename?: 'CustomerListEdge';
  node: Customer;
  cursor: Scalars['String'];
};

export type CustomerListInput = {
  appId: Maybe<Scalars['String']>;
};

export type CustomerListNew = {
  __typename?: 'CustomerListNew';
  edges: Maybe<Array<CustomerListEdge>>;
  totalCount: Scalars['Int'];
};

export type CustomerListNewEdge = {
  __typename?: 'CustomerListNewEdge';
  node: Customer;
  cursor: Scalars['String'];
};

export type CustomerOrder = {
  productId: Scalars['Int'];
  qty: Scalars['Int'];
  dealId: Scalars['Int'];
  salePrice: Scalars['Float'];
};

export type CustomerOrderInput = {
  order: Array<CustomerOrder>;
  customerId: Scalars['Int'];
  delivery: DeliveryEnum;
  appId: Maybe<Scalars['String']>;
};

export type CustomerOrderResult = {
  __typename?: 'CustomerOrderResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Data = {
  __typename?: 'Data';
  id: Maybe<Scalars['Int']>;
  customer_id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  is_tiered: Maybe<Scalars['Int']>;
  tier_id: Maybe<Scalars['Int']>;
  ogr: Maybe<Scalars['Float']>;
  act: Maybe<Scalars['Float']>;
  sim: Maybe<Scalars['Float']>;
  network_id: Maybe<Scalars['Int']>;
  is_split: Maybe<Scalars['Int']>;
};

export type DataBundlesInput = {
  network: DataBundlesInputNetworks;
  appId: Maybe<Scalars['String']>;
};

export enum DataBundlesInputNetworks {
  Mtn = 'MTN',
  CellC = 'CellC',
  TelkomMobile = 'TelkomMobile',
  Vodacom = 'Vodacom',
  Cconnect = 'CCONNECT'
}

export type DataBundlesNetworkInput = {
  appId: Maybe<Scalars['String']>;
};

export type DataBundlesNetworkResult = {
  __typename?: 'DataBundlesNetworkResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
  cellc: Array<Maybe<BundleNetwork>>;
  mtn: Array<Maybe<BundleNetwork>>;
  telkom: Array<Maybe<BundleNetwork>>;
  vodacom: Array<Maybe<BundleNetwork>>;
  cconnect: Array<Maybe<BundleNetwork>>;
};

export type DataBundlesResult = {
  __typename?: 'DataBundlesResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<BundlesEdge>>;
  totalCount: Scalars['Int'];
};

export type DataTopupInput = {
  code: Scalars['Int'];
  phoneNumber: Scalars['String'];
  network: Scalars['String'];
  reference: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type DataTopupResult = {
  __typename?: 'DataTopupResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
};


export enum DeliveryEnum {
  Collection = 'Collection',
  Courier = 'Courier',
  Delivery = 'Delivery'
}

export type Details = {
  __typename?: 'Details';
  barcode: Maybe<Scalars['String']>;
  pod: Maybe<Scalars['String']>;
  productCode: Maybe<Scalars['String']>;
  qty: Maybe<Scalars['Int']>;
  status: Maybe<Scalars['String']>;
};

export type Device = {
  __typename?: 'Device';
  id: Scalars['ID'];
  type: Scalars['String'];
  serialNo: Scalars['String'];
  bydNo: Maybe<Scalars['String']>;
};

export type DeviceEdge = {
  __typename?: 'DeviceEdge';
  node: Device;
  cursor: Scalars['String'];
};

export type DeviceType = {
  __typename?: 'DeviceType';
  type: Maybe<Scalars['String']>;
  serial_no: Maybe<Scalars['String']>;
};

export type DevicesResult = {
  __typename?: 'DevicesResult';
  total: Scalars['Int'];
  edges: Maybe<Array<DeviceEdge>>;
};

export type DummyNode = Node & {
  __typename?: 'DummyNode';
  id: Scalars['ID'];
};

export type ElectricityTopupInput = {
  amount: Scalars['String'];
  meterNumber: Scalars['String'];
  cellNumber: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type ElectricityTopupResult = {
  __typename?: 'ElectricityTopupResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type FmcgDistributor = {
  __typename?: 'FmcgDistributor';
  reference: Scalars['String'];
  name: Scalars['String'];
  account: Scalars['String'];
  cellphone: Scalars['String'];
  email: Scalars['String'];
};

export type FmcgDistributorInput = {
  reference: Scalars['String'];
  userInfo: UserInfo;
};

export type FmcgDistributorResult = {
  __typename?: 'FmcgDistributorResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  distributor: Maybe<FmcgDistributor>;
};

export type FmcgPaymentInput = {
  name: Scalars['String'];
  accountNumber: Scalars['String'];
  bankingRef: Scalars['String'];
  amount: Scalars['String'];
  outletAccount: Maybe<Scalars['String']>;
  invoice: Scalars['String'];
  driverMobile: Scalars['String'];
  productId: Scalars['String'];
  userInfo: UserInfo;
};

export type FmcgPaymentResult = {
  __typename?: 'FmcgPaymentResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  detail: Maybe<FmcgPaymentResultDetail>;
};

export type FmcgPaymentResultDetail = {
  __typename?: 'FmcgPaymentResultDetail';
  amount: Scalars['String'];
  transRef: Scalars['String'];
  customerSlip: Maybe<Scalars['String']>;
  merchantSlip: Maybe<Scalars['String']>;
};

export type FmcgSuppliers = {
  __typename?: 'FmcgSuppliers';
  productId: Scalars['String'];
  trxTypeId: Scalars['String'];
  name: Scalars['String'];
};

export type FmcgSuppliersInput = {
  userInfo: UserInfo;
};

export type FmcgSuppliersResult = {
  __typename?: 'FmcgSuppliersResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  suppliers: Maybe<Array<Maybe<FmcgSuppliers>>>;
};

export type IaAuth = {
  deviceId: Scalars['String'];
  transType: Scalars['String'];
  userPin: Scalars['String'];
  deviceSer: Scalars['String'];
  deviceUUID: Maybe<Scalars['String']>;
  reference: Maybe<Scalars['String']>;
};

export type IaBundleTopupDataResult = {
  __typename?: 'IABundleTopupDataResult';
  transRef: Scalars['String'];
  supplierName: Scalars['String'];
  phoneNumber: Scalars['String'];
  tenderAmount: Scalars['String'];
  tenderVat: Scalars['String'];
  receiveAmount: Scalars['String'];
  ref: Scalars['String'];
  date: Scalars['String'];
  reference: Scalars['String'];
  productCode: Scalars['String'];
  callCenter: Maybe<Scalars['String']>;
  printLines: Scalars['String'];
  merchantPrintLines: Scalars['String'];
  recon: Maybe<IaRecon>;
};

export type IaBundleTopupInput = {
  auth: BusAccount;
  iaAuth: IaAuth;
  transType: Scalars['String'];
  phoneNumber: Scalars['String'];
  amount: Scalars['String'];
  senderPhoneNumber: Scalars['String'];
  productCode: Scalars['String'];
  recon: Maybe<IaReconInput>;
  network: Scalars['String'];
};

export type IaBundleTopupResult = {
  __typename?: 'IABundleTopupResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  data: Maybe<IaBundleTopupDataResult>;
};

export type IaProduct = {
  __typename?: 'IAProduct';
  type: Scalars['String'];
  network: Scalars['String'];
  description: Scalars['String'];
  amount: Scalars['String'];
  productCode: Scalars['String'];
  top5Seller: Scalars['String'];
};

export type IaRecon = {
  __typename?: 'IARecon';
  batchNumber: Scalars['String'];
  terminalId: Scalars['String'];
  merchantId: Scalars['String'];
  transNumber: Scalars['String'];
  transReference: Scalars['String'];
  sysReference: Scalars['String'];
  transDateTime: Scalars['String'];
  businessDate: Scalars['String'];
  transType: Scalars['String'];
  accountNumber: Scalars['String'];
  productId: Scalars['String'];
  amount: Scalars['String'];
  authoriser: Scalars['String'];
  productName: Scalars['String'];
};

export type IaReconInput = {
  batchNumber: Scalars['String'];
  terminalId: Scalars['String'];
  merchantId: Scalars['String'];
  transNumber: Scalars['String'];
  transReference: Scalars['String'];
  sysReference: Scalars['String'];
  transDateTime: Scalars['String'];
  businessDate: Scalars['String'];
  transType: Scalars['String'];
  accountNumber: Scalars['String'];
  productId: Scalars['String'];
  amount: Scalars['String'];
  authoriser: Scalars['String'];
  productName: Scalars['String'];
  auth: BusAccount;
};

export type IaReprintInput = {
  transRef: Scalars['String'];
  origReference: Scalars['String'];
  phoneNumber: Scalars['String'];
  iaAuth: IaAuth;
  auth: BusAccount;
};

export type IaReprintResult = {
  __typename?: 'IAReprintResult';
  transRef: Scalars['String'];
  origReference: Scalars['String'];
  phoneNumber: Scalars['String'];
  tenderAmount: Scalars['String'];
  tenderVat: Scalars['String'];
  receiveAmount: Scalars['String'];
  date: Scalars['String'];
  reference: Scalars['String'];
  callCenter: Maybe<Scalars['String']>;
  printLines: Scalars['String'];
  merchantPrintLines: Scalars['String'];
  recon: Maybe<IaRecon>;
};

export type IaTopupInput = {
  phoneNumber: Scalars['String'];
  amount: Scalars['String'];
  senderPhoneNumber: Scalars['String'];
  productCode: Scalars['String'];
  recon: Maybe<IaReconInput>;
  iaAuth: IaAuth;
  auth: BusAccount;
  network: Scalars['String'];
};

export type IaTopupResult = {
  __typename?: 'IATopupResult';
  transRef: Scalars['String'];
  supplierName: Scalars['String'];
  phoneNumber: Scalars['String'];
  tenderAmount: Scalars['String'];
  tenderVat: Scalars['String'];
  receiveAmount: Scalars['String'];
  ref: Scalars['String'];
  date: Scalars['String'];
  productCode: Scalars['String'];
  reference: Scalars['String'];
  CallCenter: Maybe<Scalars['String']>;
  printLines: Scalars['String'];
  merchantPrintLines: Scalars['String'];
  Recon: Maybe<IaRecon>;
};

export type Identity = {
  type: IdentityMethod;
  number: Scalars['String'];
  company: Maybe<Scalars['String']>;
};

export enum IdentityMethod {
  Business = 'BUSINESS',
  Passport = 'PASSPORT',
  RsaId = 'RSA_ID'
}

export type IdentityType = {
  __typename?: 'IdentityType';
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  is_active: Scalars['Int'];
  name: Scalars['String'];
  process: Scalars['String'];
  status: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Images = {
  __typename?: 'Images';
  type: Maybe<Scalars['String']>;
  base64: Maybe<Scalars['String']>;
};

export type InternationalAirtimeTopupInput = {
  amount: Scalars['String'];
  phoneNumber: Scalars['String'];
  network: Scalars['String'];
  reference: Scalars['String'];
  senderPhoneNumber: Scalars['String'];
  productCode: Scalars['String'];
};

export type InternationalAirtimeTopupResult = {
  __typename?: 'InternationalAirtimeTopupResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
};

export type LookUpOrderInput = {
  orderRedeemRef: Scalars['String'];
  userPin: Scalars['String'];
  serialNumber: Scalars['String'];
  deviceUUID: Scalars['String'];
  devUserId: Scalars['String'];
  requestId: Scalars['String'];
  deviceId: Scalars['String'];
  merchantEntityId: Scalars['String'];
};

export type MsisdnValidationDataResult = {
  __typename?: 'MSISDNValidationDataResult';
  phoneNumber: Scalars['String'];
  countryCode: Scalars['String'];
  currencyCode: Scalars['String'];
  exchangeRate: Scalars['String'];
  ref: Scalars['String'];
  date: Scalars['String'];
  reference: Scalars['String'];
  productList: Array<Maybe<IaProduct>>;
  responseMessage: Scalars['String'];
  status: Scalars['String'];
};

export type MsisdnValidationInput = {
  phoneNumber: Scalars['String'];
  reference: Scalars['String'];
  network: Maybe<Scalars['String']>;
  iaAuth: IaAuth;
  auth: BusAccount;
};

export type MsisdnValidationResult = {
  __typename?: 'MSISDNValidationResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  data: Maybe<MsisdnValidationDataResult>;
};

export type MerchantOrder = {
  product_code: Scalars['String'];
  qty: Scalars['Int'];
};

export type MerchantOrderInput = {
  order: Array<MerchantOrder>;
  appId: Scalars['String'];
};

export type MerchantOrderResult = {
  __typename?: 'MerchantOrderResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type MerchantToMerchantInfo = {
  __typename?: 'MerchantToMerchantInfo';
  TotalAmount: Maybe<Scalars['String']>;
  TransRef: Maybe<Scalars['String']>;
  ConvenienceFee: Maybe<Scalars['String']>;
  TransfereeAccount: Maybe<Scalars['String']>;
  TransfereeName: Maybe<Scalars['String']>;
};

export type MerchantToMerchantInput = {
  amount: Scalars['String'];
  accountNo: Scalars['String'];
  appId: Scalars['String'];
};

export type MerchantToMerchantResult = {
  __typename?: 'MerchantToMerchantResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  accountInfo: Maybe<MerchantToMerchantInfo>;
};

export type MerchantToMerchantTransferInput = {
  accountNo: Scalars['String'];
  amount: Scalars['String'];
  cellNumber: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type MerchantToMerchantTransferResult = {
  __typename?: 'MerchantToMerchantTransferResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateVoucher: Maybe<ActivateVoucherResult>;
  addDevice: Maybe<AddDeviceResult>;
  addNetworkContract: Maybe<AddNetworkContractResult>;
  addProductDeal: Maybe<AddProductDealResult>;
  agentRequest: Maybe<AgentRequestResult>;
  airtimeTopup: Maybe<AirtimeTopupResult>;
  allocateStock: Maybe<AllocateStockResult>;
  authRegistrationConsumer: Maybe<AccountRegisterConsumerPayload>;
  authRegistrationUser: Maybe<AccountRegisterUserPayload>;
  authResetPassword: Maybe<AuthResetPasswordPayload>;
  authValidation: Maybe<AuthValidationPayload>;
  authValidationLegacy: Maybe<AuthValidationLegacyPayload>;
  busTicketCancel: Maybe<BusTicketCancelPayload>;
  busTicketCancelConfirm: Maybe<BusTicketConfirmCancelPayload>;
  busTicketCheckout: Maybe<BusTicketCheckoutPayload>;
  busTicketConfirm: Maybe<BusTicketConfirmPayload>;
  busUpdateCustomer: Maybe<BusUpdateCustomerPayload>;
  checkStockInfo: CheckStockInfoResult;
  checkVoucherInfo: CheckVoucherInfoResult;
  confirmMeter: Maybe<ConfirmMeterResult>;
  consumerProfile: Maybe<ConsumerProfileResult>;
  customerOrder: Maybe<CustomerOrderResult>;
  dataTopup: Maybe<DataTopupResult>;
  electricityTopup: Maybe<ElectricityTopupResult>;
  fmcgPayment: FmcgPaymentResult;
  getCustomer: BusGetCustomerPayload;
  internationalAirtimeReprint: Maybe<IaReprintResult>;
  internationalAirtimeTopup: Maybe<InternationalAirtimeTopupResult>;
  internationalBundleTopup: Maybe<IaBundleTopupResult>;
  merchantOrder: Maybe<MerchantOrderResult>;
  merchantToMerchantTransfer: Maybe<MerchantToMerchantTransferResult>;
  msisdnValidation: Maybe<MsisdnValidationResult>;
  receiveStock: Maybe<ReceiveStockResult>;
  receiveStockNew: Maybe<ReceiveStockNewResult>;
  registerAgent: Maybe<RegisterAgentResult>;
  registerConsumer: Maybe<RegisterConsumerResult>;
  registerConsumerByd: Maybe<RegisterConsumerBydResult>;
  repTransfer: Maybe<RepTransferResult>;
  ricaRegister: Maybe<RicaRegisterResult>;
  sellStock: Maybe<SellStockResult>;
  setPrintedAndTender: SetPrintedAndTenderResult;
  updateNetworkContract: Maybe<UpdateNetworkContractResult>;
  uploadDocument: Maybe<UploadDocumentResult>;
  uploadId: Maybe<UploadImageResult>;
  uploadProofOfResidence: Maybe<UploadImageResult>;
  uploadSelfie: Maybe<UploadImageResult>;
  uploadSignature: UploadImageResult;
  validateBatch: ValidateProductResult;
  verifyStockReceived: Maybe<VerifyStockReceivedResult>;
  vodaPayConfirmRedeem: Scalars['String'];
  vodaPayLookup: Scalars['String'];
  vodaPayRedeem: Scalars['String'];
  vodaPayReverseRedeem: Scalars['String'];
  voucherRedemption: Maybe<VoucherRedemptionPayload>;
  vouchersTopUp: Maybe<VouchersTopUpResult>;
};


export type MutationActivateVoucherArgs = {
  input: ActivateVoucherInput;
};


export type MutationAddDeviceArgs = {
  input: AddDeviceInput;
};


export type MutationAddNetworkContractArgs = {
  input: AddNetworkContractInput;
};


export type MutationAddProductDealArgs = {
  input: AddProductDealInput;
};


export type MutationAgentRequestArgs = {
  input: AgentRequestInput;
};


export type MutationAirtimeTopupArgs = {
  input: AirtimeTopupInput;
};


export type MutationAllocateStockArgs = {
  input: AllocateStockInput;
};


export type MutationAuthRegistrationConsumerArgs = {
  input: AccountRegisterConsumerInput;
};


export type MutationAuthRegistrationUserArgs = {
  input: AccountRegisterUserInput;
};


export type MutationAuthResetPasswordArgs = {
  input: AuthResetPasswordInput;
};


export type MutationAuthValidationArgs = {
  input: AuthValidationInput;
};


export type MutationAuthValidationLegacyArgs = {
  input: AuthValidationLegacyInput;
};


export type MutationBusTicketCancelArgs = {
  input: BusTicketCancelInput;
};


export type MutationBusTicketCancelConfirmArgs = {
  input: BusTicketConfirmCancelInput;
};


export type MutationBusTicketCheckoutArgs = {
  input: BusTicketCheckoutInput;
};


export type MutationBusTicketConfirmArgs = {
  input: BusTicketConfirmInput;
};


export type MutationBusUpdateCustomerArgs = {
  input: BusUpdateCustomerInput;
};


export type MutationCheckStockInfoArgs = {
  input: CheckStockInfoInput;
};


export type MutationCheckVoucherInfoArgs = {
  input: CheckVoucherInfoInput;
};


export type MutationConfirmMeterArgs = {
  input: ConfirmMeterInput;
};


export type MutationConsumerProfileArgs = {
  input: ConsumerProfileInput;
};


export type MutationCustomerOrderArgs = {
  input: CustomerOrderInput;
};


export type MutationDataTopupArgs = {
  input: DataTopupInput;
};


export type MutationElectricityTopupArgs = {
  input: ElectricityTopupInput;
};


export type MutationFmcgPaymentArgs = {
  input: FmcgPaymentInput;
};


export type MutationGetCustomerArgs = {
  input: BusGetCustomerInput;
};


export type MutationInternationalAirtimeReprintArgs = {
  input: IaReprintInput;
};


export type MutationInternationalAirtimeTopupArgs = {
  input: InternationalAirtimeTopupInput;
};


export type MutationInternationalBundleTopupArgs = {
  input: IaBundleTopupInput;
};


export type MutationMerchantOrderArgs = {
  input: MerchantOrderInput;
};


export type MutationMerchantToMerchantTransferArgs = {
  input: MerchantToMerchantTransferInput;
};


export type MutationMsisdnValidationArgs = {
  input: MsisdnValidationInput;
};


export type MutationReceiveStockArgs = {
  input: ReceiveStockInput;
};


export type MutationReceiveStockNewArgs = {
  input: ReceiveStockNewInput;
};


export type MutationRegisterAgentArgs = {
  input: RegisterAgentInput;
};


export type MutationRegisterConsumerArgs = {
  input: RegisterConsumerInput;
};


export type MutationRegisterConsumerBydArgs = {
  input: RegisterConsumerBydInput;
};


export type MutationRepTransferArgs = {
  input: RepTransferInput;
};


export type MutationRicaRegisterArgs = {
  input: RicaRegisterInput;
};


export type MutationSellStockArgs = {
  input: SellStockInput;
};


export type MutationSetPrintedAndTenderArgs = {
  input: SetPrintedAndTenderInput;
};


export type MutationUpdateNetworkContractArgs = {
  input: UpdateNetworkContractInput;
};


export type MutationUploadDocumentArgs = {
  input: UploadDocumentInput;
};


export type MutationUploadIdArgs = {
  input: UploadImageInput;
};


export type MutationUploadProofOfResidenceArgs = {
  input: UploadImageInput;
};


export type MutationUploadSelfieArgs = {
  input: UploadImageInput;
};


export type MutationUploadSignatureArgs = {
  input: UploadImageInput;
};


export type MutationValidateBatchArgs = {
  input: ValidateProductInput;
};


export type MutationVerifyStockReceivedArgs = {
  input: VerifyStockReceivedInput;
};


export type MutationVodaPayConfirmRedeemArgs = {
  input: ConfirmRedeemInput;
};


export type MutationVodaPayLookupArgs = {
  input: LookUpOrderInput;
};


export type MutationVodaPayRedeemArgs = {
  input: RedeemOrderInput;
};


export type MutationVodaPayReverseRedeemArgs = {
  input: ReverseRedeemInput;
};


export type MutationVoucherRedemptionArgs = {
  input: VoucherRedemptionInput;
};


export type MutationVouchersTopUpArgs = {
  input: VouchersTopUpInput;
};

export type Network = {
  __typename?: 'Network';
  id: Scalars['ID'];
  network: Scalars['String'];
  colour: Scalars['String'];
  logo: Scalars['String'];
};

export type NetworkEdge = {
  __typename?: 'NetworkEdge';
  node: Network;
  cursor: Scalars['String'];
};

export enum NetworkEnum {
  Mtn = 'MTN',
  CellC = 'CellC',
  TelkomMobile = 'TelkomMobile',
  Vodacom = 'Vodacom',
  CConnect = 'CConnect'
}

export type NetworksInput = {
  type: Scalars['String'];
};

export type NetworksResult = {
  __typename?: 'NetworksResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<NetworkEdge>>;
  totalCount: Scalars['Int'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  orderId: Scalars['Int'];
  statusName: Scalars['String'];
  productCode: Scalars['String'];
  productDescription: Scalars['String'];
  qty: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Maybe<Scalars['Boolean']>;
  hasPreviousPage: Maybe<Scalars['Boolean']>;
  startCursor: Maybe<Scalars['String']>;
  endCursor: Maybe<Scalars['String']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  created_at: Scalars['String'];
  id: Scalars['Int'];
  is_active: Scalars['Int'];
  name: Scalars['String'];
  process: Scalars['String'];
  status: Scalars['String'];
  updated_at: Scalars['String'];
};

export enum Period {
  Month = 'MONTH',
  One = 'ONE',
  OneDay = 'ONE_DAY',
  OneWeek = 'ONE_WEEK',
  Three = 'THREE',
  ThreeDay = 'THREE_DAY',
  Week = 'WEEK'
}

export type Product = {
  __typename?: 'Product';
  product_id: Scalars['Int'];
  code: Scalars['String'];
  desc: Scalars['String'];
  qty: Scalars['Int'];
  networkId: Maybe<Scalars['Int']>;
};

export type ProductByEntity = {
  __typename?: 'ProductByEntity';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<ProductByEntityEdge>>;
  totalCount: Scalars['Int'];
};

export type ProductByEntityEdge = {
  __typename?: 'ProductByEntityEdge';
  node: ProductsByEntity;
  cursor: Scalars['String'];
};

export type ProductByEntityInput = {
  appId: Scalars['String'];
};

export type ProductByNetwork = {
  __typename?: 'ProductByNetwork';
  id: Scalars['ID'];
  description: Scalars['String'];
  productCode: Scalars['String'];
  productId: Scalars['Int'];
  costPrice: Maybe<Scalars['String']>;
  salePrice: Maybe<Scalars['String']>;
  actExpenseCode: Maybe<Scalars['String']>;
  ogrExpenseCode: Maybe<Scalars['String']>;
  simExpenseCode: Maybe<Scalars['String']>;
};

export type ProductDeal = {
  __typename?: 'ProductDeal';
  id: Scalars['ID'];
  dealId: Scalars['Int'];
  name: Scalars['String'];
  isTiered: Scalars['Boolean'];
  tierId: Maybe<Scalars['Int']>;
  ogr: Scalars['Float'];
  act: Scalars['Float'];
  sim: Scalars['Float'];
  isSplit: Scalars['Boolean'];
};

export type ProductDealInput = {
  productId: Scalars['Int'];
  customerId: Scalars['Int'];
  appId: Maybe<Scalars['String']>;
};

export type ProductDealList = {
  __typename?: 'ProductDealList';
  status: Scalars['String'];
  edges: Maybe<Array<ProductDealListEdge>>;
  totalCount: Scalars['Int'];
};

export type ProductDealListEdge = {
  __typename?: 'ProductDealListEdge';
  node: ProductDeal;
  cursor: Scalars['String'];
};

export type ProductTransfer = {
  product_id: Scalars['String'];
  qty: Scalars['String'];
};

export type Products = {
  __typename?: 'Products';
  product_id: Scalars['Int'];
  code: Scalars['String'];
  desc: Scalars['String'];
  qty: Scalars['Int'];
  networkId: Maybe<Scalars['Int']>;
  stockTypeId: Maybe<Scalars['Int']>;
  tradeValue: Scalars['Float'];
  retailPrice: Scalars['Float'];
};

export type ProductsByEntity = {
  __typename?: 'ProductsByEntity';
  id: Scalars['ID'];
  description: Maybe<Scalars['String']>;
  manufacturer: Maybe<Scalars['String']>;
  productCode: Maybe<Scalars['String']>;
  retailPrice: Maybe<Scalars['Float']>;
  stockTypeId: Maybe<Scalars['Int']>;
  tradeValue: Maybe<Scalars['Float']>;
};

export type ProductsByNetworkEdge = {
  __typename?: 'ProductsByNetworkEdge';
  node: ProductByNetwork;
  cursor: Scalars['String'];
};

export type ProductsByNetworkInput = {
  network: NetworkEnum;
  appId: Maybe<Scalars['String']>;
};

export type ProductsByNetworkResult = {
  __typename?: 'ProductsByNetworkResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<ProductsByNetworkEdge>>;
  totalCount: Scalars['Int'];
};

export type ProductsList = {
  __typename?: 'ProductsList';
  id: Scalars['String'];
  description: Scalars['String'];
  productCode: Scalars['String'];
  productId: Scalars['Int'];
  costPrice: Maybe<Scalars['String']>;
  salePrice: Maybe<Scalars['String']>;
};

export type ProductsListEdge = {
  __typename?: 'ProductsListEdge';
  node: ProductsList;
  cursor: Scalars['String'];
};

export type ProductsListResult = {
  __typename?: 'ProductsListResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<ProductsListEdge>>;
  totalCount: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  customerId: Scalars['Int'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  identityReference: Scalars['String'];
  cellNumber: Scalars['String'];
  userType: Role;
  devices: Maybe<Array<Maybe<DeviceType>>>;
  bydNo: Maybe<Scalars['String']>;
  ricaUsername: Maybe<Scalars['String']>;
  isRicaActive: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  accountBalance: AccountBalance;
  accountNew: AccountNew;
  accountTransactions: AccountTransactions;
  activationHistory: Maybe<ActivationHistoryResult>;
  bankDetails: BankDetails;
  bankDetailsNew: BankDetailsNew;
  bus_tickets: Maybe<User>;
  carriers: BusCarriersConnection;
  commissions: CommissionsConnection;
  countries: Maybe<Array<Maybe<Country>>>;
  customerContracts: Maybe<CustomerContractsResult>;
  customerList: Maybe<CustomerList>;
  customerListNew: CustomerList;
  dataBundles: DataBundlesResult;
  dataBundlesNetwork: DataBundlesNetworkResult;
  destinations: BusDestinationsConnection;
  fares: BusFaresConnection;
  fetchBanners: Maybe<BannersResult>;
  fetchBannersNew: Maybe<BannersResult>;
  fmcgDistributor: FmcgDistributorResult;
  fmcgPrintTransactionHistory: ReprintReceiptConnection;
  fmcgSuppliers: FmcgSuppliersResult;
  fmcgTransactionHistory: ReprintConnection;
  getDevices: Maybe<DevicesResult>;
  identityTypes: Maybe<Array<Maybe<IdentityType>>>;
  merchantToMerchant: Maybe<MerchantToMerchantResult>;
  networks: NetworksResult;
  node: Maybe<Node>;
  passPricesLookUp: BusPassPicesLookUpConnection;
  passTypes: BusPassTypesConnection;
  passesLookUp: BusPassesLookUpConnection;
  paymentMethods: Maybe<Array<Maybe<PaymentMethod>>>;
  productByEntity: ProductByEntity;
  productDeals: ProductDealList;
  productsByNetwork: ProductsByNetworkResult;
  productsList: ProductsListResult;
  profile: Maybe<Profile>;
  salesOrderList: SalesOrderList;
  stockList: StockList;
  stockListNew: StockListNew;
  stockToReceive: StockReceiveList;
  stockToReceiveNew: StockReceiveListNew;
  stops: BusStopsConnection;
  svcValidate: BusTicketsConnection;
  ticketLookUp: BusTicketLookUpConnection;
  tickets: Maybe<BusTicketsConnection>;
  transactions: TransactionsConnection;
  userPerformance: UserPerformance;
  validateBox: ValidateBoxResult;
  validateProduct: ValidateProductResult;
  voucherList: VoucherListResult;
};


export type QueryAccountNewArgs = {
  input: AccountNewInput;
};


export type QueryAccountTransactionsArgs = {
  input: AccountTransactionsInput;
};


export type QueryActivationHistoryArgs = {
  input: ActivationHistoryInput;
};


export type QueryBankDetailsNewArgs = {
  input: BankDetailsNewInput;
};


export type QueryBus_TicketsArgs = {
  card_number: Scalars['String'];
};


export type QueryCarriersArgs = {
  input: BusAccount;
};


export type QueryCommissionsArgs = {
  input: CommissionsInput;
};


export type QueryCustomerContractsArgs = {
  input: CustomerContractsInput;
};


export type QueryCustomerListNewArgs = {
  input: CustomerListInput;
};


export type QueryDataBundlesArgs = {
  input: DataBundlesInput;
};


export type QueryDataBundlesNetworkArgs = {
  input: DataBundlesNetworkInput;
};


export type QueryDestinationsArgs = {
  companyId: Scalars['ID'];
  departureLocationId: Scalars['String'];
  auth: Maybe<BusAccount>;
};


export type QueryFaresArgs = {
  input: Maybe<BusFareInput>;
};


export type QueryFetchBannersNewArgs = {
  input: BannerNewInput;
};


export type QueryFmcgDistributorArgs = {
  input: FmcgDistributorInput;
};


export type QueryFmcgPrintTransactionHistoryArgs = {
  input: ReprintReceiptInput;
  auth: BusAccount;
};


export type QueryFmcgSuppliersArgs = {
  input: FmcgSuppliersInput;
};


export type QueryFmcgTransactionHistoryArgs = {
  input: ReprintInput;
  auth: BusAccount;
};


export type QueryMerchantToMerchantArgs = {
  input: MerchantToMerchantInput;
};


export type QueryNetworksArgs = {
  input: NetworksInput;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryPassPricesLookUpArgs = {
  input: Maybe<BusPassPricesLookUpInput>;
  auth: BusAccount;
};


export type QueryPassTypesArgs = {
  input: BusAccount;
};


export type QueryPassesLookUpArgs = {
  input: Maybe<BusPassesLookUpInput>;
  auth: BusAccount;
};


export type QueryProductByEntityArgs = {
  input: ProductByEntityInput;
};


export type QueryProductDealsArgs = {
  input: ProductDealInput;
};


export type QueryProductsByNetworkArgs = {
  input: ProductsByNetworkInput;
};


export type QuerySalesOrderListArgs = {
  input: SalesOrderListInput;
};


export type QueryStockListNewArgs = {
  input: StockListNewInput;
};


export type QueryStockToReceiveNewArgs = {
  input: StockReceiveListNewInput;
};


export type QueryStopsArgs = {
  input: BusStopsInput;
};


export type QuerySvcValidateArgs = {
  svcValidation: Maybe<SvcValidation>;
  auth: BusAccount;
};


export type QueryTicketLookUpArgs = {
  input: Maybe<BusTicketLookUpInput>;
  auth: BusAccount;
};


export type QueryTicketsArgs = {
  svcValidation: Maybe<SvcValidation>;
  auth: BusAccount;
};


export type QueryTransactionsArgs = {
  input: TransactionsInput;
};


export type QueryUserPerformanceArgs = {
  input: UserPerformanceInput;
};


export type QueryValidateBoxArgs = {
  input: ValidateBoxInput;
};


export type QueryValidateProductArgs = {
  input: ValidateProductInput;
};


export type QueryVoucherListArgs = {
  input: VoucherListInput;
};

export type ReceiveStockInput = {
  productId: Scalars['Int'];
  barcode: Scalars['String'];
  orderId: Scalars['Int'];
  appId: Maybe<Scalars['String']>;
};

export type ReceiveStockNewInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type ReceiveStockNewResult = {
  __typename?: 'ReceiveStockNewResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  repTransferId: Maybe<Scalars['Int']>;
  productCode: Maybe<Scalars['String']>;
  productName: Maybe<Scalars['String']>;
  transferQty: Maybe<Scalars['Int']>;
  receivedQty: Maybe<Scalars['Int']>;
  pendingQty: Maybe<Scalars['Int']>;
};

export type ReceiveStockResult = {
  __typename?: 'ReceiveStockResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  qty: Maybe<Scalars['Int']>;
  scannedQty: Maybe<Scalars['Int']>;
};

export type RedeemOrderInput = {
  merchantEntityId: Scalars['String'];
  merchantName: Scalars['String'];
  providerTrxId: Scalars['String'];
  merchantTrxId: Scalars['String'];
  amount: Scalars['Int'];
  secretCode: Scalars['Int'];
  orderRedeemRef: Scalars['String'];
  userPin: Scalars['String'];
  serialNumber: Scalars['String'];
  deviceUUID: Scalars['String'];
  devUserId: Scalars['String'];
  requestId: Scalars['String'];
  deviceId: Scalars['String'];
};

export type RegisterAgentInput = {
  custCode: Scalars['String'];
  base64image: Scalars['String'];
  base64imageRep: Scalars['String'];
  appId: Scalars['String'];
};

export type RegisterAgentResult = {
  __typename?: 'RegisterAgentResult';
  success: Maybe<Scalars['Boolean']>;
  message: Maybe<Scalars['String']>;
};

export type RegisterConsumerAddress = {
  line1: Scalars['String'];
  line2: Maybe<Scalars['String']>;
  line3: Maybe<Scalars['String']>;
  code: Scalars['Int'];
  city: Scalars['String'];
  province: Scalars['String'];
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
};

export type RegisterConsumerBydInput = {
  DeviceSerialNo: Scalars['String'];
  appIds: Maybe<Scalars['String']>;
};

export type RegisterConsumerBydResult = {
  __typename?: 'RegisterConsumerBydResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  status: Scalars['String'];
  token: Maybe<Scalars['String']>;
};

export type RegisterConsumerInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  business: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  idType: Maybe<IdentityMethod>;
  address: RegisterConsumerAddress;
  appId: Maybe<Scalars['String']>;
  deviceSerialNo: Maybe<Scalars['String']>;
};

export type RegisterConsumerResult = {
  __typename?: 'RegisterConsumerResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  token: Maybe<Scalars['String']>;
};

export type RepTransferInput = {
  transfer: Array<ProductTransfer>;
  appId: Maybe<Scalars['String']>;
};

export type RepTransferResult = {
  __typename?: 'RepTransferResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Reprint = {
  __typename?: 'Reprint';
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['Float']>;
  ref: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  date: Maybe<Scalars['DateTime']>;
};

export type ReprintConnection = {
  __typename?: 'ReprintConnection';
  edges: Maybe<Array<ReprintEdge>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type ReprintEdge = {
  __typename?: 'ReprintEdge';
  node: Reprint;
  cursor: Maybe<Scalars['String']>;
};

export type ReprintInput = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};

export type ReprintReceipt = {
  __typename?: 'ReprintReceipt';
  line: Maybe<Scalars['String']>;
};

export type ReprintReceiptConnection = {
  __typename?: 'ReprintReceiptConnection';
  printLines: Maybe<Scalars['String']>;
};

export type ReprintReceiptInput = {
  transId: Scalars['ID'];
  userReprint: Scalars['Int'];
};

export enum ResetMethod {
  Email = 'EMAIL',
  Sms = 'SMS'
}

export type Response = {
  __typename?: 'Response';
  message: Scalars['String'];
  code: Scalars['Int'];
};

export type ReverseRedeemInput = {
  id: Scalars['String'];
  merchantName: Scalars['String'];
  merchantTrxId: Scalars['String'];
  providerTrxId: Scalars['String'];
  merchantEntityId: Scalars['String'];
  amount: Scalars['Int'];
  orderRedeemRef: Scalars['String'];
  userPin: Scalars['String'];
  serialNumber: Scalars['String'];
  deviceUUID: Scalars['String'];
  devUserId: Scalars['String'];
  requestId: Scalars['String'];
  deviceId: Scalars['String'];
};

export type RicaRegisterInput = {
  simDetails: SimDetails;
  isIndividual: Scalars['Boolean'];
  identity: Identity;
  customer: CustomerDetail;
  appId: Maybe<Scalars['String']>;
};

export type RicaRegisterResult = {
  __typename?: 'RicaRegisterResult';
  success: Scalars['Boolean'];
  message: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  description: Scalars['String'];
  slug: Scalars['String'];
};

export type RouteRecursor = {
  __typename?: 'RouteRecursor';
  routes: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SalesOrderList = {
  __typename?: 'SalesOrderList';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<SalesOrderListEdge>>;
  totalCount: Scalars['Int'];
};

export type SalesOrderListEdge = {
  __typename?: 'SalesOrderListEdge';
  node: Order;
  cursor: Scalars['String'];
};

export type SalesOrderListInput = {
  appId: Maybe<Scalars['String']>;
};

export type Sector = {
  sector: Maybe<SvcBlock>;
};

export type SellStockInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type SellStockResult = {
  __typename?: 'SellStockResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type SetPrintedAndTenderInput = {
  transRefs: Array<Scalars['String']>;
  tender: TenderAmounts;
  userInfo: UserInfo;
};

export type SetPrintedAndTenderResult = {
  __typename?: 'SetPrintedAndTenderResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  accounts: Maybe<Array<TenderAccountResult>>;
};

export type SimDetails = {
  network: Scalars['String'];
  simNumber: Scalars['String'];
};

export type Stock = {
  __typename?: 'Stock';
  id: Scalars['String'];
  name: Scalars['String'];
  network: Scalars['String'];
  productCode: Scalars['String'];
  productId: Scalars['Int'];
  qty: Scalars['Int'];
};

export type StockInfo = {
  __typename?: 'StockInfo';
  barcode: Maybe<Scalars['String']>;
  productCode: Maybe<Scalars['String']>;
  qty: Maybe<Scalars['Int']>;
  invoiceDate: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  network: Maybe<Scalars['String']>;
  warehouse: Maybe<Scalars['String']>;
  custName: Maybe<Scalars['String']>;
  custCode: Maybe<Scalars['String']>;
  ricaStatus: Maybe<Scalars['String']>;
};

export type StockList = {
  __typename?: 'StockList';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<StockListEdge>>;
  totalCount: Scalars['Int'];
};

export type StockListEdge = {
  __typename?: 'StockListEdge';
  node: Stock;
  cursor: Scalars['String'];
};

export type StockListNew = {
  __typename?: 'StockListNew';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<StockListNewEdge>>;
  totalCount: Scalars['Int'];
};

export type StockListNewEdge = {
  __typename?: 'StockListNewEdge';
  node: Stock;
  cursor: Scalars['String'];
};

export type StockListNewInput = {
  appId: Maybe<Scalars['String']>;
};

export type StockReceive = {
  __typename?: 'StockReceive';
  id: Scalars['String'];
  name: Scalars['String'];
  network: Scalars['String'];
  orderId: Scalars['Int'];
  productCode: Scalars['String'];
  productId: Scalars['Int'];
  qty: Scalars['Int'];
  scannedQty: Scalars['Int'];
};

export type StockReceiveList = {
  __typename?: 'StockReceiveList';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<StockReceiveListEdge>>;
  totalCount: Scalars['Int'];
};

export type StockReceiveListEdge = {
  __typename?: 'StockReceiveListEdge';
  node: StockReceive;
  cursor: Scalars['String'];
};

export type StockReceiveListNew = {
  __typename?: 'StockReceiveListNew';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<StockReceiveListNewEdge>>;
  totalCount: Scalars['Int'];
};

export type StockReceiveListNewEdge = {
  __typename?: 'StockReceiveListNewEdge';
  node: StockReceive;
  cursor: Scalars['String'];
};

export type StockReceiveListNewInput = {
  appId: Maybe<Scalars['String']>;
};

export type SvcBlock = {
  sector_no: Scalars['String'];
  block0: Scalars['String'];
  block1: Scalars['String'];
  block2: Scalars['String'];
};

export type SvcBlockOutput = {
  __typename?: 'SvcBlockOutput';
  sector_no: Scalars['String'];
  block0: Scalars['String'];
  block1: Scalars['String'];
  block2: Scalars['String'];
};

export type SvcUpdate = {
  __typename?: 'SvcUpdate';
  sectors: Array<Maybe<SvcBlockOutput>>;
};

export type SvcValidation = {
  uid: Scalars['String'];
  svcData: Array<Maybe<Sector>>;
};

export type TenderAccountResult = {
  __typename?: 'TenderAccountResult';
  id: Scalars['Int'];
  account: Scalars['String'];
  balance: Scalars['Float'];
  profit: Scalars['Float'];
};

export type TenderAmounts = {
  cash: Scalars['Float'];
  change: Scalars['Float'];
  cheque: Scalars['Float'];
  creditCard: Scalars['Float'];
  debitCard: Scalars['Float'];
  other: Scalars['Float'];
};

export type Ticket = {
  __typename?: 'Ticket';
  price: Maybe<Scalars['Int']>;
  type: Maybe<Scalars['String']>;
  depature: Maybe<Scalars['String']>;
  destination: Maybe<Scalars['String']>;
};

export type TicketBus = {
  id: Maybe<Scalars['ID']>;
  sessionId: Scalars['String'];
  responseCode: Scalars['Int'];
  responseMessage: Scalars['String'];
  companyId: Scalars['Int'];
  ticketId: Scalars['Int'];
  ticketNo: Scalars['String'];
  ticketType: Scalars['String'];
  routeId1: Scalars['Int'];
  routeId2: Scalars['Int'];
  routeCode1: Scalars['String'];
  routeCode2: Scalars['String'];
  fare: Scalars['String'];
  fareProductId: Scalars['String'];
  departureLocationId: Scalars['String'];
  destinationLocationId: Scalars['String'];
  activationDate: Scalars['DateTime'];
  expiryDate: Scalars['DateTime'];
  ticketDate: Scalars['DateTime'];
  numberOfDaysTrips: Scalars['Int'];
  numberOfTransfers: Scalars['Int'];
  status: Scalars['String'];
  rules: Scalars['String'];
  fareCurrency: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Maybe<Scalars['ID']>;
  amount: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  node: Transaction;
  cursor: Maybe<Scalars['String']>;
};

export type Transactions = {
  __typename?: 'Transactions';
  id: Scalars['String'];
  transactionId: Scalars['Int'];
  timeStamp: Scalars['String'];
  transactionDescription: Scalars['String'];
  debitAmount: Scalars['String'];
  creditAmount: Scalars['String'];
  balance: Scalars['String'];
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  totalAmount: Scalars['Float'];
  edges: Maybe<Array<TransactionEdge>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type TransactionsInput = {
  period: Period;
  appId: Maybe<Scalars['String']>;
};

export type UpdateNetworkContractInput = {
  customerId: Scalars['Int'];
  network: NetworkEnum;
  isTiered: Maybe<Scalars['Boolean']>;
  isSplit: Maybe<Scalars['Boolean']>;
  ogr: Scalars['Float'];
  act: Scalars['Float'];
  sim: Scalars['Float'];
  appId: Maybe<Scalars['String']>;
};

export type UpdateNetworkContractResult = {
  __typename?: 'UpdateNetworkContractResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UploadDocumentInput = {
  base64image: Scalars['String'];
  type: Scalars['String'];
  appId: Maybe<Scalars['String']>;
  customerId: Scalars['Int'];
};

export type UploadDocumentResult = {
  __typename?: 'UploadDocumentResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UploadImageInput = {
  base64image: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type UploadImageResult = {
  __typename?: 'UploadImageResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  status: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  message: Scalars['String'];
  name: Scalars['String'];
  ticket_count: Maybe<Scalars['Int']>;
  type: Card;
  tickets: Maybe<Array<Ticket>>;
};

export type UserInfo = {
  deviceId: Scalars['String'];
  serial: Scalars['String'];
  userPin: Scalars['String'];
  location: Scalars['String'];
  version: Scalars['String'];
};

export type UserPerformance = {
  __typename?: 'UserPerformance';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  totalActivations: Maybe<Scalars['Float']>;
  totalConnections: Maybe<Scalars['Float']>;
  totalStock: Maybe<Scalars['Float']>;
  totalTranfer: Maybe<Scalars['Float']>;
  totalSold: Maybe<Scalars['Float']>;
};

export type UserPerformanceInput = {
  type: Scalars['String'];
  network: NetworkEnum;
  customerId: Scalars['Int'];
  date: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type ValidateBoxInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type ValidateBoxResult = {
  __typename?: 'ValidateBoxResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  product: Maybe<Products>;
};

export type ValidateProductInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type ValidateProductResult = {
  __typename?: 'ValidateProductResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  product: Maybe<Product>;
};

export type VerifyStockReceivedInput = {
  barcode: Scalars['String'];
  appId: Maybe<Scalars['String']>;
};

export type VerifyStockReceivedResult = {
  __typename?: 'VerifyStockReceivedResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export enum VoucherEnumType {
  Cash = 'CASH',
  Goods = 'GOODS'
}

export type VoucherListEdge = {
  __typename?: 'VoucherListEdge';
  node: Vouchers;
  cursor: Scalars['String'];
};

export type VoucherListInput = {
  type: VoucherListInputTypes;
  appId: Scalars['String'];
};

export enum VoucherListInputTypes {
  SupaBets = 'SupaBets',
  Hollywood = 'Hollywood',
  Ringas = 'Ringas',
  BluVoucher = 'BluVoucher'
}

export type VoucherListResult = {
  __typename?: 'VoucherListResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  edges: Maybe<Array<VoucherListEdge>>;
  totalCount: Scalars['Int'];
};

export type VoucherRedemptionInput = {
  username: Scalars['String'];
  consumerIdNumber: Maybe<Scalars['String']>;
  requestId: Scalars['String'];
  mobileNumber: Scalars['String'];
  password: Scalars['String'];
  voucherNumber: Scalars['String'];
  transactionType: VoucherEnumType;
  amount: Scalars['Int'];
  clientMutationId: Maybe<Scalars['String']>;
};

export type VoucherRedemptionPayload = {
  __typename?: 'VoucherRedemptionPayload';
  requestId: Scalars['String'];
  dateTime: Maybe<Scalars['DateTime']>;
  balance: Maybe<Scalars['Float']>;
  reference: Maybe<Scalars['String']>;
  clientMutationId: Maybe<Scalars['String']>;
};

export type Vouchers = {
  __typename?: 'Vouchers';
  id: Scalars['ID'];
  type: Scalars['String'];
  name: Scalars['String'];
  amount: Scalars['String'];
  categoryId: Scalars['String'];
  productId: Scalars['Int'];
};

export type VouchersTopUpInput = {
  qty: Scalars['Int'];
  productId: Scalars['Int'];
  cellNumber: Scalars['String'];
  voucherType: VouchersTopUpTypes;
  appId: Maybe<Scalars['String']>;
};

export type VouchersTopUpResult = {
  __typename?: 'VouchersTopUpResult';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export enum VouchersTopUpTypes {
  SupaBets = 'SupaBets',
  Hollywood = 'Hollywood',
  Ringas = 'Ringas',
  BluVoucher = 'BluVoucher'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AccountBalance: ResolverTypeWrapper<AccountBalance>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AccountNew: ResolverTypeWrapper<AccountNew>;
  AccountNewInput: AccountNewInput;
  AccountRegisterConsumerInput: AccountRegisterConsumerInput;
  AccountRegisterConsumerPayload: ResolverTypeWrapper<AccountRegisterConsumerPayload>;
  AccountRegisterUserInput: AccountRegisterUserInput;
  AccountRegisterUserPayload: ResolverTypeWrapper<AccountRegisterUserPayload>;
  AccountTransactions: ResolverTypeWrapper<AccountTransactions>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AccountTransactionsEdge: ResolverTypeWrapper<AccountTransactionsEdge>;
  AccountTransactionsInput: AccountTransactionsInput;
  ActivateStock: ActivateStock;
  ActivateVoucherInput: ActivateVoucherInput;
  ActivateVoucherResult: ResolverTypeWrapper<ActivateVoucherResult>;
  ActivationHistoryEdge: ResolverTypeWrapper<ActivationHistoryEdge>;
  ActivationHistoryInput: ActivationHistoryInput;
  ActivationHistoryResult: ResolverTypeWrapper<ActivationHistoryResult>;
  Activations: ResolverTypeWrapper<Activations>;
  AddDeviceInput: AddDeviceInput;
  AddDeviceResult: ResolverTypeWrapper<AddDeviceResult>;
  AddNetworkContractInput: AddNetworkContractInput;
  AddNetworkContractResult: ResolverTypeWrapper<AddNetworkContractResult>;
  AddProductDealInput: AddProductDealInput;
  AddProductDealResult: ResolverTypeWrapper<AddProductDealResult>;
  AeonAuth: ResolverTypeWrapper<AeonAuth>;
  AeonResult: ResolverTypeWrapper<AeonResult>;
  AgentRequestInput: AgentRequestInput;
  AgentRequestResult: ResolverTypeWrapper<AgentRequestResult>;
  AirtimeTopupInput: AirtimeTopupInput;
  AirtimeTopupResult: ResolverTypeWrapper<AirtimeTopupResult>;
  AllocateStock: AllocateStock;
  AllocateStockInput: AllocateStockInput;
  AllocateStockResult: ResolverTypeWrapper<AllocateStockResult>;
  AuthResetPasswordInput: AuthResetPasswordInput;
  AuthResetPasswordPayload: ResolverTypeWrapper<AuthResetPasswordPayload>;
  AuthValidationInput: AuthValidationInput;
  AuthValidationLegacyInput: AuthValidationLegacyInput;
  AuthValidationLegacyPayload: ResolverTypeWrapper<AuthValidationLegacyPayload>;
  AuthValidationPayload: ResolverTypeWrapper<AuthValidationPayload>;
  BankDetail: ResolverTypeWrapper<BankDetail>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  BankDetails: ResolverTypeWrapper<BankDetails>;
  BankDetailsEdge: ResolverTypeWrapper<BankDetailsEdge>;
  BankDetailsNew: ResolverTypeWrapper<BankDetailsNew>;
  BankDetailsNewInput: BankDetailsNewInput;
  Banner: ResolverTypeWrapper<Banner>;
  BannerEdge: ResolverTypeWrapper<BannerEdge>;
  BannerNewInput: BannerNewInput;
  BannersResult: ResolverTypeWrapper<BannersResult>;
  Bundle: ResolverTypeWrapper<Bundle>;
  BundleNetwork: ResolverTypeWrapper<BundleNetwork>;
  BundlesEdge: ResolverTypeWrapper<BundlesEdge>;
  BusAccount: BusAccount;
  BusCarrierLocation: ResolverTypeWrapper<BusCarrierLocation>;
  BusCarriersConnection: ResolverTypeWrapper<BusCarriersConnection>;
  BusCarriersEdge: ResolverTypeWrapper<BusCarriersEdge>;
  BusCustomerInfo: ResolverTypeWrapper<BusCustomerInfo>;
  BusDestinationLocation: ResolverTypeWrapper<BusDestinationLocation>;
  BusDestinationsConnection: ResolverTypeWrapper<BusDestinationsConnection>;
  BusDestinationsEdge: ResolverTypeWrapper<BusDestinationsEdge>;
  BusFare: ResolverTypeWrapper<BusFare>;
  BusFareInput: BusFareInput;
  BusFaresConnection: ResolverTypeWrapper<BusFaresConnection>;
  BusFaresEdge: ResolverTypeWrapper<BusFaresEdge>;
  BusGetCustomerInput: BusGetCustomerInput;
  BusGetCustomerPayload: ResolverTypeWrapper<BusGetCustomerPayload>;
  BusLocation: ResolverTypeWrapper<BusLocation>;
  BusLocationEdge: ResolverTypeWrapper<BusLocationEdge>;
  BusPass: ResolverTypeWrapper<BusPass>;
  BusPassEdge: ResolverTypeWrapper<BusPassEdge>;
  BusPassPicesLookUpConnection: ResolverTypeWrapper<BusPassPicesLookUpConnection>;
  BusPassPrice: ResolverTypeWrapper<BusPassPrice>;
  BusPassPriceEdge: ResolverTypeWrapper<BusPassPriceEdge>;
  BusPassPricesLookUpInput: BusPassPricesLookUpInput;
  BusPassType: ResolverTypeWrapper<BusPassType>;
  BusPassTypeEdge: ResolverTypeWrapper<BusPassTypeEdge>;
  BusPassTypesConnection: ResolverTypeWrapper<BusPassTypesConnection>;
  BusPassesLookUpConnection: ResolverTypeWrapper<BusPassesLookUpConnection>;
  BusPassesLookUpInput: BusPassesLookUpInput;
  BusStopLocation: ResolverTypeWrapper<BusStopLocation>;
  BusStopsConnection: ResolverTypeWrapper<BusStopsConnection>;
  BusStopsEdge: ResolverTypeWrapper<BusStopsEdge>;
  BusStopsInput: BusStopsInput;
  BusTicket: ResolverTypeWrapper<BusTicket>;
  BusTicketCancelInput: BusTicketCancelInput;
  BusTicketCancelPayload: ResolverTypeWrapper<BusTicketCancelPayload>;
  BusTicketCheckoutInput: BusTicketCheckoutInput;
  BusTicketCheckoutPayload: ResolverTypeWrapper<BusTicketCheckoutPayload>;
  BusTicketConfirmCancelInput: BusTicketConfirmCancelInput;
  BusTicketConfirmCancelPayload: ResolverTypeWrapper<BusTicketConfirmCancelPayload>;
  BusTicketConfirmInput: BusTicketConfirmInput;
  BusTicketConfirmPayload: ResolverTypeWrapper<BusTicketConfirmPayload>;
  BusTicketInput: BusTicketInput;
  BusTicketLocation: ResolverTypeWrapper<BusTicketLocation>;
  BusTicketLookUpConnection: ResolverTypeWrapper<BusTicketLookUpConnection>;
  BusTicketLookUpInput: BusTicketLookUpInput;
  BusTicketsConnection: ResolverTypeWrapper<BusTicketsConnection>;
  BusTicketsEdge: ResolverTypeWrapper<BusTicketsEdge>;
  BusTicketsEdges: BusTicketsEdges;
  BusTicketsRequest: BusTicketsRequest;
  BusUpdateCustomerInput: BusUpdateCustomerInput;
  BusUpdateCustomerPayload: ResolverTypeWrapper<BusUpdateCustomerPayload>;
  Card: ResolverTypeWrapper<Card>;
  CheckStockInfoInput: CheckStockInfoInput;
  CheckStockInfoResult: ResolverTypeWrapper<CheckStockInfoResult>;
  CheckVoucherInfoInput: CheckVoucherInfoInput;
  CheckVoucherInfoResult: ResolverTypeWrapper<CheckVoucherInfoResult>;
  Commission: ResolverTypeWrapper<Commission>;
  CommissionEdge: ResolverTypeWrapper<CommissionEdge>;
  CommissionsConnection: ResolverTypeWrapper<CommissionsConnection>;
  CommissionsInput: CommissionsInput;
  ConfirmMeterDetail: ResolverTypeWrapper<ConfirmMeterDetail>;
  ConfirmMeterInput: ConfirmMeterInput;
  ConfirmMeterResult: ResolverTypeWrapper<ConfirmMeterResult>;
  ConfirmRedeemInput: ConfirmRedeemInput;
  ConsumerProfileInput: ConsumerProfileInput;
  ConsumerProfileResult: ResolverTypeWrapper<ConsumerProfileResult>;
  Country: ResolverTypeWrapper<Country>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerContractsInput: CustomerContractsInput;
  CustomerContractsResult: ResolverTypeWrapper<CustomerContractsResult>;
  CustomerDetail: CustomerDetail;
  CustomerList: ResolverTypeWrapper<CustomerList>;
  CustomerListEdge: ResolverTypeWrapper<CustomerListEdge>;
  CustomerListInput: CustomerListInput;
  CustomerListNew: ResolverTypeWrapper<CustomerListNew>;
  CustomerListNewEdge: ResolverTypeWrapper<CustomerListNewEdge>;
  CustomerOrder: CustomerOrder;
  CustomerOrderInput: CustomerOrderInput;
  CustomerOrderResult: ResolverTypeWrapper<CustomerOrderResult>;
  Data: ResolverTypeWrapper<Data>;
  DataBundlesInput: DataBundlesInput;
  DataBundlesInputNetworks: DataBundlesInputNetworks;
  DataBundlesNetworkInput: DataBundlesNetworkInput;
  DataBundlesNetworkResult: ResolverTypeWrapper<DataBundlesNetworkResult>;
  DataBundlesResult: ResolverTypeWrapper<DataBundlesResult>;
  DataTopupInput: DataTopupInput;
  DataTopupResult: ResolverTypeWrapper<DataTopupResult>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeliveryEnum: DeliveryEnum;
  Details: ResolverTypeWrapper<Details>;
  Device: ResolverTypeWrapper<Device>;
  DeviceEdge: ResolverTypeWrapper<DeviceEdge>;
  DeviceType: ResolverTypeWrapper<DeviceType>;
  DevicesResult: ResolverTypeWrapper<DevicesResult>;
  DummyNode: ResolverTypeWrapper<DummyNode>;
  ElectricityTopupInput: ElectricityTopupInput;
  ElectricityTopupResult: ResolverTypeWrapper<ElectricityTopupResult>;
  FmcgDistributor: ResolverTypeWrapper<FmcgDistributor>;
  FmcgDistributorInput: FmcgDistributorInput;
  FmcgDistributorResult: ResolverTypeWrapper<FmcgDistributorResult>;
  FmcgPaymentInput: FmcgPaymentInput;
  FmcgPaymentResult: ResolverTypeWrapper<FmcgPaymentResult>;
  FmcgPaymentResultDetail: ResolverTypeWrapper<FmcgPaymentResultDetail>;
  FmcgSuppliers: ResolverTypeWrapper<FmcgSuppliers>;
  FmcgSuppliersInput: FmcgSuppliersInput;
  FmcgSuppliersResult: ResolverTypeWrapper<FmcgSuppliersResult>;
  IAAuth: IaAuth;
  IABundleTopupDataResult: ResolverTypeWrapper<IaBundleTopupDataResult>;
  IABundleTopupInput: IaBundleTopupInput;
  IABundleTopupResult: ResolverTypeWrapper<IaBundleTopupResult>;
  IAProduct: ResolverTypeWrapper<IaProduct>;
  IARecon: ResolverTypeWrapper<IaRecon>;
  IAReconInput: IaReconInput;
  IAReprintInput: IaReprintInput;
  IAReprintResult: ResolverTypeWrapper<IaReprintResult>;
  IATopupInput: IaTopupInput;
  IATopupResult: ResolverTypeWrapper<IaTopupResult>;
  Identity: Identity;
  IdentityMethod: IdentityMethod;
  IdentityType: ResolverTypeWrapper<IdentityType>;
  Images: ResolverTypeWrapper<Images>;
  InternationalAirtimeTopupInput: InternationalAirtimeTopupInput;
  InternationalAirtimeTopupResult: ResolverTypeWrapper<InternationalAirtimeTopupResult>;
  LookUpOrderInput: LookUpOrderInput;
  MSISDNValidationDataResult: ResolverTypeWrapper<MsisdnValidationDataResult>;
  MSISDNValidationInput: MsisdnValidationInput;
  MSISDNValidationResult: ResolverTypeWrapper<MsisdnValidationResult>;
  MerchantOrder: MerchantOrder;
  MerchantOrderInput: MerchantOrderInput;
  MerchantOrderResult: ResolverTypeWrapper<MerchantOrderResult>;
  MerchantToMerchantInfo: ResolverTypeWrapper<MerchantToMerchantInfo>;
  MerchantToMerchantInput: MerchantToMerchantInput;
  MerchantToMerchantResult: ResolverTypeWrapper<MerchantToMerchantResult>;
  MerchantToMerchantTransferInput: MerchantToMerchantTransferInput;
  MerchantToMerchantTransferResult: ResolverTypeWrapper<MerchantToMerchantTransferResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Network: ResolverTypeWrapper<Network>;
  NetworkEdge: ResolverTypeWrapper<NetworkEdge>;
  NetworkEnum: NetworkEnum;
  NetworksInput: NetworksInput;
  NetworksResult: ResolverTypeWrapper<NetworksResult>;
  Node: ResolversTypes['DummyNode'];
  Order: ResolverTypeWrapper<Order>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaymentMethod: ResolverTypeWrapper<PaymentMethod>;
  Period: Period;
  Product: ResolverTypeWrapper<Product>;
  ProductByEntity: ResolverTypeWrapper<ProductByEntity>;
  ProductByEntityEdge: ResolverTypeWrapper<ProductByEntityEdge>;
  ProductByEntityInput: ProductByEntityInput;
  ProductByNetwork: ResolverTypeWrapper<ProductByNetwork>;
  ProductDeal: ResolverTypeWrapper<ProductDeal>;
  ProductDealInput: ProductDealInput;
  ProductDealList: ResolverTypeWrapper<ProductDealList>;
  ProductDealListEdge: ResolverTypeWrapper<ProductDealListEdge>;
  ProductTransfer: ProductTransfer;
  Products: ResolverTypeWrapper<Products>;
  ProductsByEntity: ResolverTypeWrapper<ProductsByEntity>;
  ProductsByNetworkEdge: ResolverTypeWrapper<ProductsByNetworkEdge>;
  ProductsByNetworkInput: ProductsByNetworkInput;
  ProductsByNetworkResult: ResolverTypeWrapper<ProductsByNetworkResult>;
  ProductsList: ResolverTypeWrapper<ProductsList>;
  ProductsListEdge: ResolverTypeWrapper<ProductsListEdge>;
  ProductsListResult: ResolverTypeWrapper<ProductsListResult>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  ReceiveStockInput: ReceiveStockInput;
  ReceiveStockNewInput: ReceiveStockNewInput;
  ReceiveStockNewResult: ResolverTypeWrapper<ReceiveStockNewResult>;
  ReceiveStockResult: ResolverTypeWrapper<ReceiveStockResult>;
  RedeemOrderInput: RedeemOrderInput;
  RegisterAgentInput: RegisterAgentInput;
  RegisterAgentResult: ResolverTypeWrapper<RegisterAgentResult>;
  RegisterConsumerAddress: RegisterConsumerAddress;
  RegisterConsumerBydInput: RegisterConsumerBydInput;
  RegisterConsumerBydResult: ResolverTypeWrapper<RegisterConsumerBydResult>;
  RegisterConsumerInput: RegisterConsumerInput;
  RegisterConsumerResult: ResolverTypeWrapper<RegisterConsumerResult>;
  RepTransferInput: RepTransferInput;
  RepTransferResult: ResolverTypeWrapper<RepTransferResult>;
  Reprint: ResolverTypeWrapper<Reprint>;
  ReprintConnection: ResolverTypeWrapper<ReprintConnection>;
  ReprintEdge: ResolverTypeWrapper<ReprintEdge>;
  ReprintInput: ReprintInput;
  ReprintReceipt: ResolverTypeWrapper<ReprintReceipt>;
  ReprintReceiptConnection: ResolverTypeWrapper<ReprintReceiptConnection>;
  ReprintReceiptInput: ReprintReceiptInput;
  ResetMethod: ResetMethod;
  Response: ResolverTypeWrapper<Response>;
  ReverseRedeemInput: ReverseRedeemInput;
  RicaRegisterInput: RicaRegisterInput;
  RicaRegisterResult: ResolverTypeWrapper<RicaRegisterResult>;
  Role: ResolverTypeWrapper<Role>;
  RouteRecursor: ResolverTypeWrapper<RouteRecursor>;
  SalesOrderList: ResolverTypeWrapper<SalesOrderList>;
  SalesOrderListEdge: ResolverTypeWrapper<SalesOrderListEdge>;
  SalesOrderListInput: SalesOrderListInput;
  Sector: Sector;
  SellStockInput: SellStockInput;
  SellStockResult: ResolverTypeWrapper<SellStockResult>;
  SetPrintedAndTenderInput: SetPrintedAndTenderInput;
  SetPrintedAndTenderResult: ResolverTypeWrapper<SetPrintedAndTenderResult>;
  SimDetails: SimDetails;
  Stock: ResolverTypeWrapper<Stock>;
  StockInfo: ResolverTypeWrapper<StockInfo>;
  StockList: ResolverTypeWrapper<StockList>;
  StockListEdge: ResolverTypeWrapper<StockListEdge>;
  StockListNew: ResolverTypeWrapper<StockListNew>;
  StockListNewEdge: ResolverTypeWrapper<StockListNewEdge>;
  StockListNewInput: StockListNewInput;
  StockReceive: ResolverTypeWrapper<StockReceive>;
  StockReceiveList: ResolverTypeWrapper<StockReceiveList>;
  StockReceiveListEdge: ResolverTypeWrapper<StockReceiveListEdge>;
  StockReceiveListNew: ResolverTypeWrapper<StockReceiveListNew>;
  StockReceiveListNewEdge: ResolverTypeWrapper<StockReceiveListNewEdge>;
  StockReceiveListNewInput: StockReceiveListNewInput;
  SvcBlock: SvcBlock;
  SvcBlockOutput: ResolverTypeWrapper<SvcBlockOutput>;
  SvcUpdate: ResolverTypeWrapper<SvcUpdate>;
  SvcValidation: SvcValidation;
  TenderAccountResult: ResolverTypeWrapper<TenderAccountResult>;
  TenderAmounts: TenderAmounts;
  Ticket: ResolverTypeWrapper<Ticket>;
  TicketBus: TicketBus;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionEdge: ResolverTypeWrapper<TransactionEdge>;
  Transactions: ResolverTypeWrapper<Transactions>;
  TransactionsConnection: ResolverTypeWrapper<TransactionsConnection>;
  TransactionsInput: TransactionsInput;
  UpdateNetworkContractInput: UpdateNetworkContractInput;
  UpdateNetworkContractResult: ResolverTypeWrapper<UpdateNetworkContractResult>;
  UploadDocumentInput: UploadDocumentInput;
  UploadDocumentResult: ResolverTypeWrapper<UploadDocumentResult>;
  UploadImageInput: UploadImageInput;
  UploadImageResult: ResolverTypeWrapper<UploadImageResult>;
  User: ResolverTypeWrapper<User>;
  UserInfo: UserInfo;
  UserPerformance: ResolverTypeWrapper<UserPerformance>;
  UserPerformanceInput: UserPerformanceInput;
  ValidateBoxInput: ValidateBoxInput;
  ValidateBoxResult: ResolverTypeWrapper<ValidateBoxResult>;
  ValidateProductInput: ValidateProductInput;
  ValidateProductResult: ResolverTypeWrapper<ValidateProductResult>;
  VerifyStockReceivedInput: VerifyStockReceivedInput;
  VerifyStockReceivedResult: ResolverTypeWrapper<VerifyStockReceivedResult>;
  VoucherEnumType: VoucherEnumType;
  VoucherListEdge: ResolverTypeWrapper<VoucherListEdge>;
  VoucherListInput: VoucherListInput;
  VoucherListInputTypes: VoucherListInputTypes;
  VoucherListResult: ResolverTypeWrapper<VoucherListResult>;
  VoucherRedemptionInput: VoucherRedemptionInput;
  VoucherRedemptionPayload: ResolverTypeWrapper<VoucherRedemptionPayload>;
  Vouchers: ResolverTypeWrapper<Vouchers>;
  VouchersTopUpInput: VouchersTopUpInput;
  VouchersTopUpResult: ResolverTypeWrapper<VouchersTopUpResult>;
  VouchersTopUpTypes: VouchersTopUpTypes;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Float: Scalars['Float'];
  String: Scalars['String'];
  AccountBalance: AccountBalance;
  Boolean: Scalars['Boolean'];
  AccountNew: AccountNew;
  AccountNewInput: AccountNewInput;
  AccountRegisterConsumerInput: AccountRegisterConsumerInput;
  AccountRegisterConsumerPayload: AccountRegisterConsumerPayload;
  AccountRegisterUserInput: AccountRegisterUserInput;
  AccountRegisterUserPayload: AccountRegisterUserPayload;
  AccountTransactions: AccountTransactions;
  Int: Scalars['Int'];
  AccountTransactionsEdge: AccountTransactionsEdge;
  AccountTransactionsInput: AccountTransactionsInput;
  ActivateStock: ActivateStock;
  ActivateVoucherInput: ActivateVoucherInput;
  ActivateVoucherResult: ActivateVoucherResult;
  ActivationHistoryEdge: ActivationHistoryEdge;
  ActivationHistoryInput: ActivationHistoryInput;
  ActivationHistoryResult: ActivationHistoryResult;
  Activations: Activations;
  AddDeviceInput: AddDeviceInput;
  AddDeviceResult: AddDeviceResult;
  AddNetworkContractInput: AddNetworkContractInput;
  AddNetworkContractResult: AddNetworkContractResult;
  AddProductDealInput: AddProductDealInput;
  AddProductDealResult: AddProductDealResult;
  AeonAuth: AeonAuth;
  AeonResult: AeonResult;
  AgentRequestInput: AgentRequestInput;
  AgentRequestResult: AgentRequestResult;
  AirtimeTopupInput: AirtimeTopupInput;
  AirtimeTopupResult: AirtimeTopupResult;
  AllocateStock: AllocateStock;
  AllocateStockInput: AllocateStockInput;
  AllocateStockResult: AllocateStockResult;
  AuthResetPasswordInput: AuthResetPasswordInput;
  AuthResetPasswordPayload: AuthResetPasswordPayload;
  AuthValidationInput: AuthValidationInput;
  AuthValidationLegacyInput: AuthValidationLegacyInput;
  AuthValidationLegacyPayload: AuthValidationLegacyPayload;
  AuthValidationPayload: AuthValidationPayload;
  BankDetail: BankDetail;
  ID: Scalars['ID'];
  BankDetails: BankDetails;
  BankDetailsEdge: BankDetailsEdge;
  BankDetailsNew: BankDetailsNew;
  BankDetailsNewInput: BankDetailsNewInput;
  Banner: Banner;
  BannerEdge: BannerEdge;
  BannerNewInput: BannerNewInput;
  BannersResult: BannersResult;
  Bundle: Bundle;
  BundleNetwork: BundleNetwork;
  BundlesEdge: BundlesEdge;
  BusAccount: BusAccount;
  BusCarrierLocation: BusCarrierLocation;
  BusCarriersConnection: BusCarriersConnection;
  BusCarriersEdge: BusCarriersEdge;
  BusCustomerInfo: BusCustomerInfo;
  BusDestinationLocation: BusDestinationLocation;
  BusDestinationsConnection: BusDestinationsConnection;
  BusDestinationsEdge: BusDestinationsEdge;
  BusFare: BusFare;
  BusFareInput: BusFareInput;
  BusFaresConnection: BusFaresConnection;
  BusFaresEdge: BusFaresEdge;
  BusGetCustomerInput: BusGetCustomerInput;
  BusGetCustomerPayload: BusGetCustomerPayload;
  BusLocation: BusLocation;
  BusLocationEdge: BusLocationEdge;
  BusPass: BusPass;
  BusPassEdge: BusPassEdge;
  BusPassPicesLookUpConnection: BusPassPicesLookUpConnection;
  BusPassPrice: BusPassPrice;
  BusPassPriceEdge: BusPassPriceEdge;
  BusPassPricesLookUpInput: BusPassPricesLookUpInput;
  BusPassType: BusPassType;
  BusPassTypeEdge: BusPassTypeEdge;
  BusPassTypesConnection: BusPassTypesConnection;
  BusPassesLookUpConnection: BusPassesLookUpConnection;
  BusPassesLookUpInput: BusPassesLookUpInput;
  BusStopLocation: BusStopLocation;
  BusStopsConnection: BusStopsConnection;
  BusStopsEdge: BusStopsEdge;
  BusStopsInput: BusStopsInput;
  BusTicket: BusTicket;
  BusTicketCancelInput: BusTicketCancelInput;
  BusTicketCancelPayload: BusTicketCancelPayload;
  BusTicketCheckoutInput: BusTicketCheckoutInput;
  BusTicketCheckoutPayload: BusTicketCheckoutPayload;
  BusTicketConfirmCancelInput: BusTicketConfirmCancelInput;
  BusTicketConfirmCancelPayload: BusTicketConfirmCancelPayload;
  BusTicketConfirmInput: BusTicketConfirmInput;
  BusTicketConfirmPayload: BusTicketConfirmPayload;
  BusTicketInput: BusTicketInput;
  BusTicketLocation: BusTicketLocation;
  BusTicketLookUpConnection: BusTicketLookUpConnection;
  BusTicketLookUpInput: BusTicketLookUpInput;
  BusTicketsConnection: BusTicketsConnection;
  BusTicketsEdge: BusTicketsEdge;
  BusTicketsEdges: BusTicketsEdges;
  BusTicketsRequest: BusTicketsRequest;
  BusUpdateCustomerInput: BusUpdateCustomerInput;
  BusUpdateCustomerPayload: BusUpdateCustomerPayload;
  Card: Card;
  CheckStockInfoInput: CheckStockInfoInput;
  CheckStockInfoResult: CheckStockInfoResult;
  CheckVoucherInfoInput: CheckVoucherInfoInput;
  CheckVoucherInfoResult: CheckVoucherInfoResult;
  Commission: Commission;
  CommissionEdge: CommissionEdge;
  CommissionsConnection: CommissionsConnection;
  CommissionsInput: CommissionsInput;
  ConfirmMeterDetail: ConfirmMeterDetail;
  ConfirmMeterInput: ConfirmMeterInput;
  ConfirmMeterResult: ConfirmMeterResult;
  ConfirmRedeemInput: ConfirmRedeemInput;
  ConsumerProfileInput: ConsumerProfileInput;
  ConsumerProfileResult: ConsumerProfileResult;
  Country: Country;
  Customer: Customer;
  CustomerContractsInput: CustomerContractsInput;
  CustomerContractsResult: CustomerContractsResult;
  CustomerDetail: CustomerDetail;
  CustomerList: CustomerList;
  CustomerListEdge: CustomerListEdge;
  CustomerListInput: CustomerListInput;
  CustomerListNew: CustomerListNew;
  CustomerListNewEdge: CustomerListNewEdge;
  CustomerOrder: CustomerOrder;
  CustomerOrderInput: CustomerOrderInput;
  CustomerOrderResult: CustomerOrderResult;
  Data: Data;
  DataBundlesInput: DataBundlesInput;
  DataBundlesNetworkInput: DataBundlesNetworkInput;
  DataBundlesNetworkResult: DataBundlesNetworkResult;
  DataBundlesResult: DataBundlesResult;
  DataTopupInput: DataTopupInput;
  DataTopupResult: DataTopupResult;
  DateTime: Scalars['DateTime'];
  Details: Details;
  Device: Device;
  DeviceEdge: DeviceEdge;
  DeviceType: DeviceType;
  DevicesResult: DevicesResult;
  DummyNode: DummyNode;
  ElectricityTopupInput: ElectricityTopupInput;
  ElectricityTopupResult: ElectricityTopupResult;
  FmcgDistributor: FmcgDistributor;
  FmcgDistributorInput: FmcgDistributorInput;
  FmcgDistributorResult: FmcgDistributorResult;
  FmcgPaymentInput: FmcgPaymentInput;
  FmcgPaymentResult: FmcgPaymentResult;
  FmcgPaymentResultDetail: FmcgPaymentResultDetail;
  FmcgSuppliers: FmcgSuppliers;
  FmcgSuppliersInput: FmcgSuppliersInput;
  FmcgSuppliersResult: FmcgSuppliersResult;
  IAAuth: IaAuth;
  IABundleTopupDataResult: IaBundleTopupDataResult;
  IABundleTopupInput: IaBundleTopupInput;
  IABundleTopupResult: IaBundleTopupResult;
  IAProduct: IaProduct;
  IARecon: IaRecon;
  IAReconInput: IaReconInput;
  IAReprintInput: IaReprintInput;
  IAReprintResult: IaReprintResult;
  IATopupInput: IaTopupInput;
  IATopupResult: IaTopupResult;
  Identity: Identity;
  IdentityType: IdentityType;
  Images: Images;
  InternationalAirtimeTopupInput: InternationalAirtimeTopupInput;
  InternationalAirtimeTopupResult: InternationalAirtimeTopupResult;
  LookUpOrderInput: LookUpOrderInput;
  MSISDNValidationDataResult: MsisdnValidationDataResult;
  MSISDNValidationInput: MsisdnValidationInput;
  MSISDNValidationResult: MsisdnValidationResult;
  MerchantOrder: MerchantOrder;
  MerchantOrderInput: MerchantOrderInput;
  MerchantOrderResult: MerchantOrderResult;
  MerchantToMerchantInfo: MerchantToMerchantInfo;
  MerchantToMerchantInput: MerchantToMerchantInput;
  MerchantToMerchantResult: MerchantToMerchantResult;
  MerchantToMerchantTransferInput: MerchantToMerchantTransferInput;
  MerchantToMerchantTransferResult: MerchantToMerchantTransferResult;
  Mutation: {};
  Network: Network;
  NetworkEdge: NetworkEdge;
  NetworksInput: NetworksInput;
  NetworksResult: NetworksResult;
  Node: ResolversParentTypes['DummyNode'];
  Order: Order;
  PageInfo: PageInfo;
  PaymentMethod: PaymentMethod;
  Product: Product;
  ProductByEntity: ProductByEntity;
  ProductByEntityEdge: ProductByEntityEdge;
  ProductByEntityInput: ProductByEntityInput;
  ProductByNetwork: ProductByNetwork;
  ProductDeal: ProductDeal;
  ProductDealInput: ProductDealInput;
  ProductDealList: ProductDealList;
  ProductDealListEdge: ProductDealListEdge;
  ProductTransfer: ProductTransfer;
  Products: Products;
  ProductsByEntity: ProductsByEntity;
  ProductsByNetworkEdge: ProductsByNetworkEdge;
  ProductsByNetworkInput: ProductsByNetworkInput;
  ProductsByNetworkResult: ProductsByNetworkResult;
  ProductsList: ProductsList;
  ProductsListEdge: ProductsListEdge;
  ProductsListResult: ProductsListResult;
  Profile: Profile;
  Query: {};
  ReceiveStockInput: ReceiveStockInput;
  ReceiveStockNewInput: ReceiveStockNewInput;
  ReceiveStockNewResult: ReceiveStockNewResult;
  ReceiveStockResult: ReceiveStockResult;
  RedeemOrderInput: RedeemOrderInput;
  RegisterAgentInput: RegisterAgentInput;
  RegisterAgentResult: RegisterAgentResult;
  RegisterConsumerAddress: RegisterConsumerAddress;
  RegisterConsumerBydInput: RegisterConsumerBydInput;
  RegisterConsumerBydResult: RegisterConsumerBydResult;
  RegisterConsumerInput: RegisterConsumerInput;
  RegisterConsumerResult: RegisterConsumerResult;
  RepTransferInput: RepTransferInput;
  RepTransferResult: RepTransferResult;
  Reprint: Reprint;
  ReprintConnection: ReprintConnection;
  ReprintEdge: ReprintEdge;
  ReprintInput: ReprintInput;
  ReprintReceipt: ReprintReceipt;
  ReprintReceiptConnection: ReprintReceiptConnection;
  ReprintReceiptInput: ReprintReceiptInput;
  Response: Response;
  ReverseRedeemInput: ReverseRedeemInput;
  RicaRegisterInput: RicaRegisterInput;
  RicaRegisterResult: RicaRegisterResult;
  Role: Role;
  RouteRecursor: RouteRecursor;
  SalesOrderList: SalesOrderList;
  SalesOrderListEdge: SalesOrderListEdge;
  SalesOrderListInput: SalesOrderListInput;
  Sector: Sector;
  SellStockInput: SellStockInput;
  SellStockResult: SellStockResult;
  SetPrintedAndTenderInput: SetPrintedAndTenderInput;
  SetPrintedAndTenderResult: SetPrintedAndTenderResult;
  SimDetails: SimDetails;
  Stock: Stock;
  StockInfo: StockInfo;
  StockList: StockList;
  StockListEdge: StockListEdge;
  StockListNew: StockListNew;
  StockListNewEdge: StockListNewEdge;
  StockListNewInput: StockListNewInput;
  StockReceive: StockReceive;
  StockReceiveList: StockReceiveList;
  StockReceiveListEdge: StockReceiveListEdge;
  StockReceiveListNew: StockReceiveListNew;
  StockReceiveListNewEdge: StockReceiveListNewEdge;
  StockReceiveListNewInput: StockReceiveListNewInput;
  SvcBlock: SvcBlock;
  SvcBlockOutput: SvcBlockOutput;
  SvcUpdate: SvcUpdate;
  SvcValidation: SvcValidation;
  TenderAccountResult: TenderAccountResult;
  TenderAmounts: TenderAmounts;
  Ticket: Ticket;
  TicketBus: TicketBus;
  Transaction: Transaction;
  TransactionEdge: TransactionEdge;
  Transactions: Transactions;
  TransactionsConnection: TransactionsConnection;
  TransactionsInput: TransactionsInput;
  UpdateNetworkContractInput: UpdateNetworkContractInput;
  UpdateNetworkContractResult: UpdateNetworkContractResult;
  UploadDocumentInput: UploadDocumentInput;
  UploadDocumentResult: UploadDocumentResult;
  UploadImageInput: UploadImageInput;
  UploadImageResult: UploadImageResult;
  User: User;
  UserInfo: UserInfo;
  UserPerformance: UserPerformance;
  UserPerformanceInput: UserPerformanceInput;
  ValidateBoxInput: ValidateBoxInput;
  ValidateBoxResult: ValidateBoxResult;
  ValidateProductInput: ValidateProductInput;
  ValidateProductResult: ValidateProductResult;
  VerifyStockReceivedInput: VerifyStockReceivedInput;
  VerifyStockReceivedResult: VerifyStockReceivedResult;
  VoucherListEdge: VoucherListEdge;
  VoucherListInput: VoucherListInput;
  VoucherListResult: VoucherListResult;
  VoucherRedemptionInput: VoucherRedemptionInput;
  VoucherRedemptionPayload: VoucherRedemptionPayload;
  Vouchers: Vouchers;
  VouchersTopUpInput: VouchersTopUpInput;
  VouchersTopUpResult: VouchersTopUpResult;
}>;

export type RelayIdDirectiveArgs = {   type: Scalars['String']; };

export type RelayIdDirectiveResolver<Result, Parent, ContextType = Context, Args = RelayIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  balance: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  profit: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  accountNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountBalanceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccountBalance'] = ResolversParentTypes['AccountBalance']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currentBalance: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  accountNo: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountNewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccountNew'] = ResolversParentTypes['AccountNew']> = ResolversObject<{
  balance: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  profit: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  accountNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountRegisterConsumerPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccountRegisterConsumerPayload'] = ResolversParentTypes['AccountRegisterConsumerPayload']> = ResolversObject<{
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groupId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identityReference: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identityReferenceExpiryDate: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identityReferenceOriginCountry: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identityTypeId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  output: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentMethodId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repUserId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vatRegistered: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountRegisterUserPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccountRegisterUserPayload'] = ResolversParentTypes['AccountRegisterUserPayload']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountTransactionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccountTransactions'] = ResolversParentTypes['AccountTransactions']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['AccountTransactionsEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountTransactionsEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccountTransactionsEdge'] = ResolversParentTypes['AccountTransactionsEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Transactions'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivateVoucherResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ActivateVoucherResult'] = ResolversParentTypes['ActivateVoucherResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivationHistoryEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ActivationHistoryEdge'] = ResolversParentTypes['ActivationHistoryEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Activations'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivationHistoryResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ActivationHistoryResult'] = ResolversParentTypes['ActivationHistoryResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['ActivationHistoryEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivationsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Activations'] = ResolversParentTypes['Activations']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  box: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddDeviceResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AddDeviceResult'] = ResolversParentTypes['AddDeviceResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddNetworkContractResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AddNetworkContractResult'] = ResolversParentTypes['AddNetworkContractResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddProductDealResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AddProductDealResult'] = ResolversParentTypes['AddProductDealResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AeonAuthResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AeonAuth'] = ResolversParentTypes['AeonAuth']> = ResolversObject<{
  authorized: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  clientMutationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AeonResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AeonResult'] = ResolversParentTypes['AeonResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  response: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AgentRequestResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AgentRequestResult'] = ResolversParentTypes['AgentRequestResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AirtimeTopupResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AirtimeTopupResult'] = ResolversParentTypes['AirtimeTopupResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AllocateStockResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AllocateStockResult'] = ResolversParentTypes['AllocateStockResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResetPasswordPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthResetPasswordPayload'] = ResolversParentTypes['AuthResetPasswordPayload']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  clientMutationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthValidationLegacyPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthValidationLegacyPayload'] = ResolversParentTypes['AuthValidationLegacyPayload']> = ResolversObject<{
  authorized: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  clientMutationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthValidationPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthValidationPayload'] = ResolversParentTypes['AuthValidationPayload']> = ResolversObject<{
  authorized: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profile: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  clientMutationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BankDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BankDetail'] = ResolversParentTypes['BankDetail']> = ResolversObject<{
  accountName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bank: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  branch: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  branchCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  swift: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  universalCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BankDetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BankDetails'] = ResolversParentTypes['BankDetails']> = ResolversObject<{
  edges: Resolver<Maybe<Array<ResolversTypes['BankDetailsEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BankDetailsEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BankDetailsEdge'] = ResolversParentTypes['BankDetailsEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['BankDetail'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BankDetailsNewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BankDetailsNew'] = ResolversParentTypes['BankDetailsNew']> = ResolversObject<{
  edges: Resolver<Maybe<Array<ResolversTypes['BankDetailsEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BannerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Banner'] = ResolversParentTypes['Banner']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BannerEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BannerEdge'] = ResolversParentTypes['BannerEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['Banner'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BannersResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BannersResult'] = ResolversParentTypes['BannersResult']> = ResolversObject<{
  edges: Resolver<Maybe<Array<ResolversTypes['BannerEdge']>>, ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BundleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Bundle'] = ResolversParentTypes['Bundle']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  network: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BundleNetworkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BundleNetwork'] = ResolversParentTypes['BundleNetwork']> = ResolversObject<{
  category: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BundlesEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BundlesEdge'] = ResolversParentTypes['BundlesEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Bundle'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusCarrierLocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusCarrierLocation'] = ResolversParentTypes['BusCarrierLocation']> = ResolversObject<{
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusCarriersConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusCarriersConnection'] = ResolversParentTypes['BusCarriersConnection']> = ResolversObject<{
  companiesEdges: Resolver<Array<ResolversTypes['BusCarriersEdge']>, ParentType, ContextType>;
  passTypesEdges: Resolver<Array<ResolversTypes['BusPassTypeEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  companiesCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  passTypesCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusCarriersEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusCarriersEdge'] = ResolversParentTypes['BusCarriersEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusCarrierLocation'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusCustomerInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusCustomerInfo'] = ResolversParentTypes['BusCustomerInfo']> = ResolversObject<{
  uid: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surname: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cellNumber: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  issueDate: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiry: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusDestinationLocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusDestinationLocation'] = ResolversParentTypes['BusDestinationLocation']> = ResolversObject<{
  locationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entityId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusDestinationsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusDestinationsConnection'] = ResolversParentTypes['BusDestinationsConnection']> = ResolversObject<{
  edges: Resolver<Array<ResolversTypes['BusDestinationsEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusDestinationsEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusDestinationsEdge'] = ResolversParentTypes['BusDestinationsEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusDestinationLocation'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusFareResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusFare'] = ResolversParentTypes['BusFare']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  period: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fareProductId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  routes: Resolver<ResolversTypes['RouteRecursor'], ParentType, ContextType>;
  companyId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  weekdays: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  availableFrom: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  availableTo: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transferCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  passValue: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tripsPerDay: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  passType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusFaresConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusFaresConnection'] = ResolversParentTypes['BusFaresConnection']> = ResolversObject<{
  totalAmount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['BusFaresEdge']>>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sessionId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responseCode: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  responseMessage: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusFaresEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusFaresEdge'] = ResolversParentTypes['BusFaresEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusFare'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusGetCustomerPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusGetCustomerPayload'] = ResolversParentTypes['BusGetCustomerPayload']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerInfo: Resolver<ResolversTypes['BusCustomerInfo'], ParentType, ContextType>;
  pageNumber: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPages: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxRecordsPerPage: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  recordsFetched: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusLocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusLocation'] = ResolversParentTypes['BusLocation']> = ResolversObject<{
  category: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transfersAllowed: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusLocationEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusLocationEdge'] = ResolversParentTypes['BusLocationEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusLocation'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPass'] = ResolversParentTypes['BusPass']> = ResolversObject<{
  activationRule: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyId: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passType: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passValue: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  period: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tripsPerDay: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weekdays: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassEdge'] = ResolversParentTypes['BusPassEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusPass'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassPicesLookUpConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassPicesLookUpConnection'] = ResolversParentTypes['BusPassPicesLookUpConnection']> = ResolversObject<{
  edges: Resolver<Array<ResolversTypes['BusPassPriceEdge']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassPriceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassPrice'] = ResolversParentTypes['BusPassPrice']> = ResolversObject<{
  passId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validFrom: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  validTo: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassPriceEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassPriceEdge'] = ResolversParentTypes['BusPassPriceEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusPassPrice'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassType'] = ResolversParentTypes['BusPassType']> = ResolversObject<{
  passTypeId: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  passType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassTypeEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassTypeEdge'] = ResolversParentTypes['BusPassTypeEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusPassType'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassTypesConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassTypesConnection'] = ResolversParentTypes['BusPassTypesConnection']> = ResolversObject<{
  edges: Resolver<Array<ResolversTypes['BusPassTypeEdge']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusPassesLookUpConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusPassesLookUpConnection'] = ResolversParentTypes['BusPassesLookUpConnection']> = ResolversObject<{
  edges: Resolver<Array<ResolversTypes['BusPassEdge']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusStopLocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusStopLocation'] = ResolversParentTypes['BusStopLocation']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusStopsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusStopsConnection'] = ResolversParentTypes['BusStopsConnection']> = ResolversObject<{
  edges: Resolver<Array<ResolversTypes['BusStopsEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusStopsEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusStopsEdge'] = ResolversParentTypes['BusStopsEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusStopLocation'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicket'] = ResolversParentTypes['BusTicket']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sessionId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responseCode: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  responseMessage: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ticketId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ticketNo: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ticketType: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ticketSaleId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  passId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  routes: Resolver<Maybe<ResolversTypes['RouteRecursor']>, ParentType, ContextType>;
  fare: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fareProductId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  departureLocationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationLocationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activationDate: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  expiryDate: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  ticketDate: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  numberOfDaysTrips: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numberOfTransfers: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rules: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fareCurrency: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locations: Resolver<Maybe<Array<Maybe<ResolversTypes['BusTicketLocation']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketCancelPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketCancelPayload'] = ResolversParentTypes['BusTicketCancelPayload']> = ResolversObject<{
  svcData: Resolver<Maybe<ResolversTypes['SvcUpdate']>, ParentType, ContextType>;
  ticket: Resolver<Maybe<ResolversTypes['BusTicket']>, ParentType, ContextType>;
  transaction: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  transref: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responseMessage: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketCheckoutPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketCheckoutPayload'] = ResolversParentTypes['BusTicketCheckoutPayload']> = ResolversObject<{
  svcData: Resolver<Maybe<ResolversTypes['SvcUpdate']>, ParentType, ContextType>;
  ticket: Resolver<Maybe<ResolversTypes['BusTicket']>, ParentType, ContextType>;
  transaction: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  transref: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketConfirmCancelPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketConfirmCancelPayload'] = ResolversParentTypes['BusTicketConfirmCancelPayload']> = ResolversObject<{
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transref: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  svcData: Resolver<Maybe<ResolversTypes['SvcUpdate']>, ParentType, ContextType>;
  ticket: Resolver<Maybe<ResolversTypes['BusTicket']>, ParentType, ContextType>;
  transaction: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  printLines: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  merchantPrintLines: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketConfirmPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketConfirmPayload'] = ResolversParentTypes['BusTicketConfirmPayload']> = ResolversObject<{
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  svcData: Resolver<Maybe<ResolversTypes['SvcUpdate']>, ParentType, ContextType>;
  ticket: Resolver<Maybe<ResolversTypes['BusTicket']>, ParentType, ContextType>;
  transaction: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  transref: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printLines: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  merchantPrintLines: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketLocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketLocation'] = ResolversParentTypes['BusTicketLocation']> = ResolversObject<{
  location_id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location_name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transfer_allowed: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketLookUpConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketLookUpConnection'] = ResolversParentTypes['BusTicketLookUpConnection']> = ResolversObject<{
  passEdges: Resolver<Maybe<Array<ResolversTypes['BusPassEdge']>>, ParentType, ContextType>;
  locationEdges: Resolver<Maybe<Array<ResolversTypes['BusLocationEdge']>>, ParentType, ContextType>;
  availableFrom: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  availableTo: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  ticketId: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  ticketNumber: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transferValidityPeriodMinutes: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  noOfTransfers: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  passCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  locationCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketsConnection'] = ResolversParentTypes['BusTicketsConnection']> = ResolversObject<{
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['BusTicketsEdge']>>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusTicketsEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusTicketsEdge'] = ResolversParentTypes['BusTicketsEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['BusTicket'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusUpdateCustomerPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BusUpdateCustomerPayload'] = ResolversParentTypes['BusUpdateCustomerPayload']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = ResolversObject<{
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  card_number: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CheckStockInfoResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CheckStockInfoResult'] = ResolversParentTypes['CheckStockInfoResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product: Resolver<Maybe<ResolversTypes['StockInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CheckVoucherInfoResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CheckVoucherInfoResult'] = ResolversParentTypes['CheckVoucherInfoResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product: Resolver<Maybe<ResolversTypes['Details']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommissionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Commission'] = ResolversParentTypes['Commission']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  retail: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  profit: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  qty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommissionEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommissionEdge'] = ResolversParentTypes['CommissionEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Commission'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommissionsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommissionsConnection'] = ResolversParentTypes['CommissionsConnection']> = ResolversObject<{
  totalRetail: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalProfit: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['CommissionEdge']>>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConfirmMeterDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConfirmMeterDetail'] = ResolversParentTypes['ConfirmMeterDetail']> = ResolversObject<{
  transRef: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customer: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  utility: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trxTypeId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConfirmMeterResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConfirmMeterResult'] = ResolversParentTypes['ConfirmMeterResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail: Resolver<Maybe<ResolversTypes['ConfirmMeterDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumerProfileResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsumerProfileResult'] = ResolversParentTypes['ConsumerProfileResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  username: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  names: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identity_reference: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cellNumber: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_line_1: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_line_2: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postal_code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customer_status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payment_method: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identity_type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images: Resolver<Maybe<Array<Maybe<ResolversTypes['Images']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = ResolversObject<{
  abv: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  abv3: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  abv3_alt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = ResolversObject<{
  customerCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerContractsResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CustomerContractsResult'] = ResolversParentTypes['CustomerContractsResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<Maybe<Array<Maybe<ResolversTypes['Data']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CustomerList'] = ResolversParentTypes['CustomerList']> = ResolversObject<{
  edges: Resolver<Maybe<Array<ResolversTypes['CustomerListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CustomerListEdge'] = ResolversParentTypes['CustomerListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerListNewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CustomerListNew'] = ResolversParentTypes['CustomerListNew']> = ResolversObject<{
  edges: Resolver<Maybe<Array<ResolversTypes['CustomerListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerListNewEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CustomerListNewEdge'] = ResolversParentTypes['CustomerListNewEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerOrderResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CustomerOrderResult'] = ResolversParentTypes['CustomerOrderResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Data'] = ResolversParentTypes['Data']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  customer_id: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  is_tiered: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tier_id: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ogr: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  act: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sim: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  network_id: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  is_split: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataBundlesNetworkResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DataBundlesNetworkResult'] = ResolversParentTypes['DataBundlesNetworkResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cellc: Resolver<Array<Maybe<ResolversTypes['BundleNetwork']>>, ParentType, ContextType>;
  mtn: Resolver<Array<Maybe<ResolversTypes['BundleNetwork']>>, ParentType, ContextType>;
  telkom: Resolver<Array<Maybe<ResolversTypes['BundleNetwork']>>, ParentType, ContextType>;
  vodacom: Resolver<Array<Maybe<ResolversTypes['BundleNetwork']>>, ParentType, ContextType>;
  cconnect: Resolver<Array<Maybe<ResolversTypes['BundleNetwork']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataBundlesResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DataBundlesResult'] = ResolversParentTypes['DataBundlesResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['BundlesEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataTopupResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DataTopupResult'] = ResolversParentTypes['DataTopupResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Details'] = ResolversParentTypes['Details']> = ResolversObject<{
  barcode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pod: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeviceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serialNo: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bydNo: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeviceEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeviceEdge'] = ResolversParentTypes['DeviceEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Device'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeviceTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeviceType'] = ResolversParentTypes['DeviceType']> = ResolversObject<{
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serial_no: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DevicesResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DevicesResult'] = ResolversParentTypes['DevicesResult']> = ResolversObject<{
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['DeviceEdge']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DummyNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DummyNode'] = ResolversParentTypes['DummyNode']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ElectricityTopupResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ElectricityTopupResult'] = ResolversParentTypes['ElectricityTopupResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FmcgDistributorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FmcgDistributor'] = ResolversParentTypes['FmcgDistributor']> = ResolversObject<{
  reference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  account: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cellphone: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FmcgDistributorResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FmcgDistributorResult'] = ResolversParentTypes['FmcgDistributorResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distributor: Resolver<Maybe<ResolversTypes['FmcgDistributor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FmcgPaymentResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FmcgPaymentResult'] = ResolversParentTypes['FmcgPaymentResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail: Resolver<Maybe<ResolversTypes['FmcgPaymentResultDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FmcgPaymentResultDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FmcgPaymentResultDetail'] = ResolversParentTypes['FmcgPaymentResultDetail']> = ResolversObject<{
  amount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transRef: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerSlip: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  merchantSlip: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FmcgSuppliersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FmcgSuppliers'] = ResolversParentTypes['FmcgSuppliers']> = ResolversObject<{
  productId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trxTypeId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FmcgSuppliersResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FmcgSuppliersResult'] = ResolversParentTypes['FmcgSuppliersResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suppliers: Resolver<Maybe<Array<Maybe<ResolversTypes['FmcgSuppliers']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IaBundleTopupDataResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IABundleTopupDataResult'] = ResolversParentTypes['IABundleTopupDataResult']> = ResolversObject<{
  transRef: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supplierName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenderAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenderVat: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receiveAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ref: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  callCenter: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printLines: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchantPrintLines: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recon: Resolver<Maybe<ResolversTypes['IARecon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IaBundleTopupResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IABundleTopupResult'] = ResolversParentTypes['IABundleTopupResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<Maybe<ResolversTypes['IABundleTopupDataResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IaProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IAProduct'] = ResolversParentTypes['IAProduct']> = ResolversObject<{
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  top5Seller: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IaReconResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IARecon'] = ResolversParentTypes['IARecon']> = ResolversObject<{
  batchNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  terminalId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchantId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transReference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sysReference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transDateTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  businessDate: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authoriser: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IaReprintResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IAReprintResult'] = ResolversParentTypes['IAReprintResult']> = ResolversObject<{
  transRef: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origReference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenderAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenderVat: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receiveAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  callCenter: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printLines: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchantPrintLines: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recon: Resolver<Maybe<ResolversTypes['IARecon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IaTopupResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IATopupResult'] = ResolversParentTypes['IATopupResult']> = ResolversObject<{
  transRef: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supplierName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenderAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenderVat: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receiveAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ref: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  CallCenter: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printLines: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchantPrintLines: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Recon: Resolver<Maybe<ResolversTypes['IARecon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IdentityTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IdentityType'] = ResolversParentTypes['IdentityType']> = ResolversObject<{
  created_at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  is_active: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  process: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImagesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Images'] = ResolversParentTypes['Images']> = ResolversObject<{
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  base64: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InternationalAirtimeTopupResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InternationalAirtimeTopupResult'] = ResolversParentTypes['InternationalAirtimeTopupResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MsisdnValidationDataResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MSISDNValidationDataResult'] = ResolversParentTypes['MSISDNValidationDataResult']> = ResolversObject<{
  phoneNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currencyCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exchangeRate: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ref: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productList: Resolver<Array<Maybe<ResolversTypes['IAProduct']>>, ParentType, ContextType>;
  responseMessage: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MsisdnValidationResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MSISDNValidationResult'] = ResolversParentTypes['MSISDNValidationResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<Maybe<ResolversTypes['MSISDNValidationDataResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MerchantOrderResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MerchantOrderResult'] = ResolversParentTypes['MerchantOrderResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MerchantToMerchantInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MerchantToMerchantInfo'] = ResolversParentTypes['MerchantToMerchantInfo']> = ResolversObject<{
  TotalAmount: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  TransRef: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ConvenienceFee: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  TransfereeAccount: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  TransfereeName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MerchantToMerchantResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MerchantToMerchantResult'] = ResolversParentTypes['MerchantToMerchantResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountInfo: Resolver<Maybe<ResolversTypes['MerchantToMerchantInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MerchantToMerchantTransferResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MerchantToMerchantTransferResult'] = ResolversParentTypes['MerchantToMerchantTransferResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  activateVoucher: Resolver<Maybe<ResolversTypes['ActivateVoucherResult']>, ParentType, ContextType, RequireFields<MutationActivateVoucherArgs, 'input'>>;
  addDevice: Resolver<Maybe<ResolversTypes['AddDeviceResult']>, ParentType, ContextType, RequireFields<MutationAddDeviceArgs, 'input'>>;
  addNetworkContract: Resolver<Maybe<ResolversTypes['AddNetworkContractResult']>, ParentType, ContextType, RequireFields<MutationAddNetworkContractArgs, 'input'>>;
  addProductDeal: Resolver<Maybe<ResolversTypes['AddProductDealResult']>, ParentType, ContextType, RequireFields<MutationAddProductDealArgs, 'input'>>;
  agentRequest: Resolver<Maybe<ResolversTypes['AgentRequestResult']>, ParentType, ContextType, RequireFields<MutationAgentRequestArgs, 'input'>>;
  airtimeTopup: Resolver<Maybe<ResolversTypes['AirtimeTopupResult']>, ParentType, ContextType, RequireFields<MutationAirtimeTopupArgs, 'input'>>;
  allocateStock: Resolver<Maybe<ResolversTypes['AllocateStockResult']>, ParentType, ContextType, RequireFields<MutationAllocateStockArgs, 'input'>>;
  authRegistrationConsumer: Resolver<Maybe<ResolversTypes['AccountRegisterConsumerPayload']>, ParentType, ContextType, RequireFields<MutationAuthRegistrationConsumerArgs, 'input'>>;
  authRegistrationUser: Resolver<Maybe<ResolversTypes['AccountRegisterUserPayload']>, ParentType, ContextType, RequireFields<MutationAuthRegistrationUserArgs, 'input'>>;
  authResetPassword: Resolver<Maybe<ResolversTypes['AuthResetPasswordPayload']>, ParentType, ContextType, RequireFields<MutationAuthResetPasswordArgs, 'input'>>;
  authValidation: Resolver<Maybe<ResolversTypes['AuthValidationPayload']>, ParentType, ContextType, RequireFields<MutationAuthValidationArgs, 'input'>>;
  authValidationLegacy: Resolver<Maybe<ResolversTypes['AuthValidationLegacyPayload']>, ParentType, ContextType, RequireFields<MutationAuthValidationLegacyArgs, 'input'>>;
  busTicketCancel: Resolver<Maybe<ResolversTypes['BusTicketCancelPayload']>, ParentType, ContextType, RequireFields<MutationBusTicketCancelArgs, 'input'>>;
  busTicketCancelConfirm: Resolver<Maybe<ResolversTypes['BusTicketConfirmCancelPayload']>, ParentType, ContextType, RequireFields<MutationBusTicketCancelConfirmArgs, 'input'>>;
  busTicketCheckout: Resolver<Maybe<ResolversTypes['BusTicketCheckoutPayload']>, ParentType, ContextType, RequireFields<MutationBusTicketCheckoutArgs, 'input'>>;
  busTicketConfirm: Resolver<Maybe<ResolversTypes['BusTicketConfirmPayload']>, ParentType, ContextType, RequireFields<MutationBusTicketConfirmArgs, 'input'>>;
  busUpdateCustomer: Resolver<Maybe<ResolversTypes['BusUpdateCustomerPayload']>, ParentType, ContextType, RequireFields<MutationBusUpdateCustomerArgs, 'input'>>;
  checkStockInfo: Resolver<ResolversTypes['CheckStockInfoResult'], ParentType, ContextType, RequireFields<MutationCheckStockInfoArgs, 'input'>>;
  checkVoucherInfo: Resolver<ResolversTypes['CheckVoucherInfoResult'], ParentType, ContextType, RequireFields<MutationCheckVoucherInfoArgs, 'input'>>;
  confirmMeter: Resolver<Maybe<ResolversTypes['ConfirmMeterResult']>, ParentType, ContextType, RequireFields<MutationConfirmMeterArgs, 'input'>>;
  consumerProfile: Resolver<Maybe<ResolversTypes['ConsumerProfileResult']>, ParentType, ContextType, RequireFields<MutationConsumerProfileArgs, 'input'>>;
  customerOrder: Resolver<Maybe<ResolversTypes['CustomerOrderResult']>, ParentType, ContextType, RequireFields<MutationCustomerOrderArgs, 'input'>>;
  dataTopup: Resolver<Maybe<ResolversTypes['DataTopupResult']>, ParentType, ContextType, RequireFields<MutationDataTopupArgs, 'input'>>;
  electricityTopup: Resolver<Maybe<ResolversTypes['ElectricityTopupResult']>, ParentType, ContextType, RequireFields<MutationElectricityTopupArgs, 'input'>>;
  fmcgPayment: Resolver<ResolversTypes['FmcgPaymentResult'], ParentType, ContextType, RequireFields<MutationFmcgPaymentArgs, 'input'>>;
  getCustomer: Resolver<ResolversTypes['BusGetCustomerPayload'], ParentType, ContextType, RequireFields<MutationGetCustomerArgs, 'input'>>;
  internationalAirtimeReprint: Resolver<Maybe<ResolversTypes['IAReprintResult']>, ParentType, ContextType, RequireFields<MutationInternationalAirtimeReprintArgs, 'input'>>;
  internationalAirtimeTopup: Resolver<Maybe<ResolversTypes['InternationalAirtimeTopupResult']>, ParentType, ContextType, RequireFields<MutationInternationalAirtimeTopupArgs, 'input'>>;
  internationalBundleTopup: Resolver<Maybe<ResolversTypes['IABundleTopupResult']>, ParentType, ContextType, RequireFields<MutationInternationalBundleTopupArgs, 'input'>>;
  merchantOrder: Resolver<Maybe<ResolversTypes['MerchantOrderResult']>, ParentType, ContextType, RequireFields<MutationMerchantOrderArgs, 'input'>>;
  merchantToMerchantTransfer: Resolver<Maybe<ResolversTypes['MerchantToMerchantTransferResult']>, ParentType, ContextType, RequireFields<MutationMerchantToMerchantTransferArgs, 'input'>>;
  msisdnValidation: Resolver<Maybe<ResolversTypes['MSISDNValidationResult']>, ParentType, ContextType, RequireFields<MutationMsisdnValidationArgs, 'input'>>;
  receiveStock: Resolver<Maybe<ResolversTypes['ReceiveStockResult']>, ParentType, ContextType, RequireFields<MutationReceiveStockArgs, 'input'>>;
  receiveStockNew: Resolver<Maybe<ResolversTypes['ReceiveStockNewResult']>, ParentType, ContextType, RequireFields<MutationReceiveStockNewArgs, 'input'>>;
  registerAgent: Resolver<Maybe<ResolversTypes['RegisterAgentResult']>, ParentType, ContextType, RequireFields<MutationRegisterAgentArgs, 'input'>>;
  registerConsumer: Resolver<Maybe<ResolversTypes['RegisterConsumerResult']>, ParentType, ContextType, RequireFields<MutationRegisterConsumerArgs, 'input'>>;
  registerConsumerByd: Resolver<Maybe<ResolversTypes['RegisterConsumerBydResult']>, ParentType, ContextType, RequireFields<MutationRegisterConsumerBydArgs, 'input'>>;
  repTransfer: Resolver<Maybe<ResolversTypes['RepTransferResult']>, ParentType, ContextType, RequireFields<MutationRepTransferArgs, 'input'>>;
  ricaRegister: Resolver<Maybe<ResolversTypes['RicaRegisterResult']>, ParentType, ContextType, RequireFields<MutationRicaRegisterArgs, 'input'>>;
  sellStock: Resolver<Maybe<ResolversTypes['SellStockResult']>, ParentType, ContextType, RequireFields<MutationSellStockArgs, 'input'>>;
  setPrintedAndTender: Resolver<ResolversTypes['SetPrintedAndTenderResult'], ParentType, ContextType, RequireFields<MutationSetPrintedAndTenderArgs, 'input'>>;
  updateNetworkContract: Resolver<Maybe<ResolversTypes['UpdateNetworkContractResult']>, ParentType, ContextType, RequireFields<MutationUpdateNetworkContractArgs, 'input'>>;
  uploadDocument: Resolver<Maybe<ResolversTypes['UploadDocumentResult']>, ParentType, ContextType, RequireFields<MutationUploadDocumentArgs, 'input'>>;
  uploadId: Resolver<Maybe<ResolversTypes['UploadImageResult']>, ParentType, ContextType, RequireFields<MutationUploadIdArgs, 'input'>>;
  uploadProofOfResidence: Resolver<Maybe<ResolversTypes['UploadImageResult']>, ParentType, ContextType, RequireFields<MutationUploadProofOfResidenceArgs, 'input'>>;
  uploadSelfie: Resolver<Maybe<ResolversTypes['UploadImageResult']>, ParentType, ContextType, RequireFields<MutationUploadSelfieArgs, 'input'>>;
  uploadSignature: Resolver<ResolversTypes['UploadImageResult'], ParentType, ContextType, RequireFields<MutationUploadSignatureArgs, 'input'>>;
  validateBatch: Resolver<ResolversTypes['ValidateProductResult'], ParentType, ContextType, RequireFields<MutationValidateBatchArgs, 'input'>>;
  verifyStockReceived: Resolver<Maybe<ResolversTypes['VerifyStockReceivedResult']>, ParentType, ContextType, RequireFields<MutationVerifyStockReceivedArgs, 'input'>>;
  vodaPayConfirmRedeem: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationVodaPayConfirmRedeemArgs, 'input'>>;
  vodaPayLookup: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationVodaPayLookupArgs, 'input'>>;
  vodaPayRedeem: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationVodaPayRedeemArgs, 'input'>>;
  vodaPayReverseRedeem: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationVodaPayReverseRedeemArgs, 'input'>>;
  voucherRedemption: Resolver<Maybe<ResolversTypes['VoucherRedemptionPayload']>, ParentType, ContextType, RequireFields<MutationVoucherRedemptionArgs, 'input'>>;
  vouchersTopUp: Resolver<Maybe<ResolversTypes['VouchersTopUpResult']>, ParentType, ContextType, RequireFields<MutationVouchersTopUpArgs, 'input'>>;
}>;

export type NetworkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Network'] = ResolversParentTypes['Network']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  network: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colour: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logo: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NetworkEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NetworkEdge'] = ResolversParentTypes['NetworkEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NetworksResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NetworksResult'] = ResolversParentTypes['NetworksResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['NetworkEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'DummyNode', ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statusName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productDescription: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentMethodResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = ResolversObject<{
  created_at: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  is_active: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  process: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  product_id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  networkId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductByEntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductByEntity'] = ResolversParentTypes['ProductByEntity']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['ProductByEntityEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductByEntityEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductByEntityEdge'] = ResolversParentTypes['ProductByEntityEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['ProductsByEntity'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductByNetworkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductByNetwork'] = ResolversParentTypes['ProductByNetwork']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  costPrice: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salePrice: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actExpenseCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ogrExpenseCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  simExpenseCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductDealResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductDeal'] = ResolversParentTypes['ProductDeal']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dealId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isTiered: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tierId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ogr: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  act: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sim: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  isSplit: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductDealListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductDealList'] = ResolversParentTypes['ProductDealList']> = ResolversObject<{
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['ProductDealListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductDealListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductDealListEdge'] = ResolversParentTypes['ProductDealListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['ProductDeal'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Products'] = ResolversParentTypes['Products']> = ResolversObject<{
  product_id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  networkId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stockTypeId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tradeValue: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  retailPrice: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsByEntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductsByEntity'] = ResolversParentTypes['ProductsByEntity']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manufacturer: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  retailPrice: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stockTypeId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tradeValue: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsByNetworkEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductsByNetworkEdge'] = ResolversParentTypes['ProductsByNetworkEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['ProductByNetwork'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsByNetworkResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductsByNetworkResult'] = ResolversParentTypes['ProductsByNetworkResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['ProductsByNetworkEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductsList'] = ResolversParentTypes['ProductsList']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  costPrice: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salePrice: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductsListEdge'] = ResolversParentTypes['ProductsListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['ProductsList'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsListResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductsListResult'] = ResolversParentTypes['ProductsListResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['ProductsListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  customerId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  identityReference: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cellNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  devices: Resolver<Maybe<Array<Maybe<ResolversTypes['DeviceType']>>>, ParentType, ContextType>;
  bydNo: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ricaUsername: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isRicaActive: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  account: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  accountBalance: Resolver<ResolversTypes['AccountBalance'], ParentType, ContextType>;
  accountNew: Resolver<ResolversTypes['AccountNew'], ParentType, ContextType, RequireFields<QueryAccountNewArgs, 'input'>>;
  accountTransactions: Resolver<ResolversTypes['AccountTransactions'], ParentType, ContextType, RequireFields<QueryAccountTransactionsArgs, 'input'>>;
  activationHistory: Resolver<Maybe<ResolversTypes['ActivationHistoryResult']>, ParentType, ContextType, RequireFields<QueryActivationHistoryArgs, 'input'>>;
  bankDetails: Resolver<ResolversTypes['BankDetails'], ParentType, ContextType>;
  bankDetailsNew: Resolver<ResolversTypes['BankDetailsNew'], ParentType, ContextType, RequireFields<QueryBankDetailsNewArgs, 'input'>>;
  bus_tickets: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryBus_TicketsArgs, 'card_number'>>;
  carriers: Resolver<ResolversTypes['BusCarriersConnection'], ParentType, ContextType, RequireFields<QueryCarriersArgs, 'input'>>;
  commissions: Resolver<ResolversTypes['CommissionsConnection'], ParentType, ContextType, RequireFields<QueryCommissionsArgs, 'input'>>;
  countries: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>;
  customerContracts: Resolver<Maybe<ResolversTypes['CustomerContractsResult']>, ParentType, ContextType, RequireFields<QueryCustomerContractsArgs, 'input'>>;
  customerList: Resolver<Maybe<ResolversTypes['CustomerList']>, ParentType, ContextType>;
  customerListNew: Resolver<ResolversTypes['CustomerList'], ParentType, ContextType, RequireFields<QueryCustomerListNewArgs, 'input'>>;
  dataBundles: Resolver<ResolversTypes['DataBundlesResult'], ParentType, ContextType, RequireFields<QueryDataBundlesArgs, 'input'>>;
  dataBundlesNetwork: Resolver<ResolversTypes['DataBundlesNetworkResult'], ParentType, ContextType, RequireFields<QueryDataBundlesNetworkArgs, 'input'>>;
  destinations: Resolver<ResolversTypes['BusDestinationsConnection'], ParentType, ContextType, RequireFields<QueryDestinationsArgs, 'companyId' | 'departureLocationId'>>;
  fares: Resolver<ResolversTypes['BusFaresConnection'], ParentType, ContextType, RequireFields<QueryFaresArgs, never>>;
  fetchBanners: Resolver<Maybe<ResolversTypes['BannersResult']>, ParentType, ContextType>;
  fetchBannersNew: Resolver<Maybe<ResolversTypes['BannersResult']>, ParentType, ContextType, RequireFields<QueryFetchBannersNewArgs, 'input'>>;
  fmcgDistributor: Resolver<ResolversTypes['FmcgDistributorResult'], ParentType, ContextType, RequireFields<QueryFmcgDistributorArgs, 'input'>>;
  fmcgPrintTransactionHistory: Resolver<ResolversTypes['ReprintReceiptConnection'], ParentType, ContextType, RequireFields<QueryFmcgPrintTransactionHistoryArgs, 'input' | 'auth'>>;
  fmcgSuppliers: Resolver<ResolversTypes['FmcgSuppliersResult'], ParentType, ContextType, RequireFields<QueryFmcgSuppliersArgs, 'input'>>;
  fmcgTransactionHistory: Resolver<ResolversTypes['ReprintConnection'], ParentType, ContextType, RequireFields<QueryFmcgTransactionHistoryArgs, 'input' | 'auth'>>;
  getDevices: Resolver<Maybe<ResolversTypes['DevicesResult']>, ParentType, ContextType>;
  identityTypes: Resolver<Maybe<Array<Maybe<ResolversTypes['IdentityType']>>>, ParentType, ContextType>;
  merchantToMerchant: Resolver<Maybe<ResolversTypes['MerchantToMerchantResult']>, ParentType, ContextType, RequireFields<QueryMerchantToMerchantArgs, 'input'>>;
  networks: Resolver<ResolversTypes['NetworksResult'], ParentType, ContextType, RequireFields<QueryNetworksArgs, 'input'>>;
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  passPricesLookUp: Resolver<ResolversTypes['BusPassPicesLookUpConnection'], ParentType, ContextType, RequireFields<QueryPassPricesLookUpArgs, 'auth'>>;
  passTypes: Resolver<ResolversTypes['BusPassTypesConnection'], ParentType, ContextType, RequireFields<QueryPassTypesArgs, 'input'>>;
  passesLookUp: Resolver<ResolversTypes['BusPassesLookUpConnection'], ParentType, ContextType, RequireFields<QueryPassesLookUpArgs, 'auth'>>;
  paymentMethods: Resolver<Maybe<Array<Maybe<ResolversTypes['PaymentMethod']>>>, ParentType, ContextType>;
  productByEntity: Resolver<ResolversTypes['ProductByEntity'], ParentType, ContextType, RequireFields<QueryProductByEntityArgs, 'input'>>;
  productDeals: Resolver<ResolversTypes['ProductDealList'], ParentType, ContextType, RequireFields<QueryProductDealsArgs, 'input'>>;
  productsByNetwork: Resolver<ResolversTypes['ProductsByNetworkResult'], ParentType, ContextType, RequireFields<QueryProductsByNetworkArgs, 'input'>>;
  productsList: Resolver<ResolversTypes['ProductsListResult'], ParentType, ContextType>;
  profile: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  salesOrderList: Resolver<ResolversTypes['SalesOrderList'], ParentType, ContextType, RequireFields<QuerySalesOrderListArgs, 'input'>>;
  stockList: Resolver<ResolversTypes['StockList'], ParentType, ContextType>;
  stockListNew: Resolver<ResolversTypes['StockListNew'], ParentType, ContextType, RequireFields<QueryStockListNewArgs, 'input'>>;
  stockToReceive: Resolver<ResolversTypes['StockReceiveList'], ParentType, ContextType>;
  stockToReceiveNew: Resolver<ResolversTypes['StockReceiveListNew'], ParentType, ContextType, RequireFields<QueryStockToReceiveNewArgs, 'input'>>;
  stops: Resolver<ResolversTypes['BusStopsConnection'], ParentType, ContextType, RequireFields<QueryStopsArgs, 'input'>>;
  svcValidate: Resolver<ResolversTypes['BusTicketsConnection'], ParentType, ContextType, RequireFields<QuerySvcValidateArgs, 'auth'>>;
  ticketLookUp: Resolver<ResolversTypes['BusTicketLookUpConnection'], ParentType, ContextType, RequireFields<QueryTicketLookUpArgs, 'auth'>>;
  tickets: Resolver<Maybe<ResolversTypes['BusTicketsConnection']>, ParentType, ContextType, RequireFields<QueryTicketsArgs, 'auth'>>;
  transactions: Resolver<ResolversTypes['TransactionsConnection'], ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'input'>>;
  userPerformance: Resolver<ResolversTypes['UserPerformance'], ParentType, ContextType, RequireFields<QueryUserPerformanceArgs, 'input'>>;
  validateBox: Resolver<ResolversTypes['ValidateBoxResult'], ParentType, ContextType, RequireFields<QueryValidateBoxArgs, 'input'>>;
  validateProduct: Resolver<ResolversTypes['ValidateProductResult'], ParentType, ContextType, RequireFields<QueryValidateProductArgs, 'input'>>;
  voucherList: Resolver<ResolversTypes['VoucherListResult'], ParentType, ContextType, RequireFields<QueryVoucherListArgs, 'input'>>;
}>;

export type ReceiveStockNewResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReceiveStockNewResult'] = ResolversParentTypes['ReceiveStockNewResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repTransferId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transferQty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  receivedQty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pendingQty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReceiveStockResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReceiveStockResult'] = ResolversParentTypes['ReceiveStockResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scannedQty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegisterAgentResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterAgentResult'] = ResolversParentTypes['RegisterAgentResult']> = ResolversObject<{
  success: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegisterConsumerBydResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterConsumerBydResult'] = ResolversParentTypes['RegisterConsumerBydResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegisterConsumerResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterConsumerResult'] = ResolversParentTypes['RegisterConsumerResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepTransferResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RepTransferResult'] = ResolversParentTypes['RepTransferResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReprintResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Reprint'] = ResolversParentTypes['Reprint']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  amount: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ref: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReprintConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReprintConnection'] = ResolversParentTypes['ReprintConnection']> = ResolversObject<{
  edges: Resolver<Maybe<Array<ResolversTypes['ReprintEdge']>>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReprintEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReprintEdge'] = ResolversParentTypes['ReprintEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Reprint'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReprintReceiptResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReprintReceipt'] = ResolversParentTypes['ReprintReceipt']> = ResolversObject<{
  line: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReprintReceiptConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReprintReceiptConnection'] = ResolversParentTypes['ReprintReceiptConnection']> = ResolversObject<{
  printLines: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RicaRegisterResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RicaRegisterResult'] = ResolversParentTypes['RicaRegisterResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RouteRecursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RouteRecursor'] = ResolversParentTypes['RouteRecursor']> = ResolversObject<{
  routes: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesOrderListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SalesOrderList'] = ResolversParentTypes['SalesOrderList']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['SalesOrderListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesOrderListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SalesOrderListEdge'] = ResolversParentTypes['SalesOrderListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SellStockResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SellStockResult'] = ResolversParentTypes['SellStockResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetPrintedAndTenderResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetPrintedAndTenderResult'] = ResolversParentTypes['SetPrintedAndTenderResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accounts: Resolver<Maybe<Array<ResolversTypes['TenderAccountResult']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stock'] = ResolversParentTypes['Stock']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  qty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockInfo'] = ResolversParentTypes['StockInfo']> = ResolversObject<{
  barcode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qty: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  invoiceDate: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  network: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  custName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  custCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ricaStatus: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockList'] = ResolversParentTypes['StockList']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['StockListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockListEdge'] = ResolversParentTypes['StockListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Stock'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockListNewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockListNew'] = ResolversParentTypes['StockListNew']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['StockListNewEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockListNewEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockListNewEdge'] = ResolversParentTypes['StockListNewEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Stock'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockReceiveResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockReceive'] = ResolversParentTypes['StockReceive']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  qty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scannedQty: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockReceiveListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockReceiveList'] = ResolversParentTypes['StockReceiveList']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['StockReceiveListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockReceiveListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockReceiveListEdge'] = ResolversParentTypes['StockReceiveListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['StockReceive'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockReceiveListNewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockReceiveListNew'] = ResolversParentTypes['StockReceiveListNew']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['StockReceiveListNewEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockReceiveListNewEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockReceiveListNewEdge'] = ResolversParentTypes['StockReceiveListNewEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['StockReceive'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SvcBlockOutputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SvcBlockOutput'] = ResolversParentTypes['SvcBlockOutput']> = ResolversObject<{
  sector_no: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block0: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block1: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  block2: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SvcUpdateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SvcUpdate'] = ResolversParentTypes['SvcUpdate']> = ResolversObject<{
  sectors: Resolver<Array<Maybe<ResolversTypes['SvcBlockOutput']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TenderAccountResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TenderAccountResult'] = ResolversParentTypes['TenderAccountResult']> = ResolversObject<{
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  profit: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TicketResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = ResolversObject<{
  price: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  depature: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destination: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  id: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  amount: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TransactionEdge'] = ResolversParentTypes['TransactionEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  cursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Transactions'] = ResolversParentTypes['Transactions']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeStamp: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionDescription: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  debitAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creditAmount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TransactionsConnection'] = ResolversParentTypes['TransactionsConnection']> = ResolversObject<{
  totalAmount: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['TransactionEdge']>>, ParentType, ContextType>;
  pageInfo: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateNetworkContractResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateNetworkContractResult'] = ResolversParentTypes['UpdateNetworkContractResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UploadDocumentResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadDocumentResult'] = ResolversParentTypes['UploadDocumentResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UploadImageResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadImageResult'] = ResolversParentTypes['UploadImageResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ticket_count: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
  tickets: Resolver<Maybe<Array<ResolversTypes['Ticket']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPerformanceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserPerformance'] = ResolversParentTypes['UserPerformance']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalActivations: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalConnections: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalStock: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalTranfer: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalSold: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidateBoxResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ValidateBoxResult'] = ResolversParentTypes['ValidateBoxResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidateProductResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ValidateProductResult'] = ResolversParentTypes['ValidateProductResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyStockReceivedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VerifyStockReceivedResult'] = ResolversParentTypes['VerifyStockReceivedResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoucherListEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VoucherListEdge'] = ResolversParentTypes['VoucherListEdge']> = ResolversObject<{
  node: Resolver<ResolversTypes['Vouchers'], ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoucherListResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VoucherListResult'] = ResolversParentTypes['VoucherListResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edges: Resolver<Maybe<Array<ResolversTypes['VoucherListEdge']>>, ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoucherRedemptionPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VoucherRedemptionPayload'] = ResolversParentTypes['VoucherRedemptionPayload']> = ResolversObject<{
  requestId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateTime: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  balance: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reference: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientMutationId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VouchersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Vouchers'] = ResolversParentTypes['Vouchers']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categoryId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VouchersTopUpResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VouchersTopUpResult'] = ResolversParentTypes['VouchersTopUpResult']> = ResolversObject<{
  success: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account: AccountResolvers<ContextType>;
  AccountBalance: AccountBalanceResolvers<ContextType>;
  AccountNew: AccountNewResolvers<ContextType>;
  AccountRegisterConsumerPayload: AccountRegisterConsumerPayloadResolvers<ContextType>;
  AccountRegisterUserPayload: AccountRegisterUserPayloadResolvers<ContextType>;
  AccountTransactions: AccountTransactionsResolvers<ContextType>;
  AccountTransactionsEdge: AccountTransactionsEdgeResolvers<ContextType>;
  ActivateVoucherResult: ActivateVoucherResultResolvers<ContextType>;
  ActivationHistoryEdge: ActivationHistoryEdgeResolvers<ContextType>;
  ActivationHistoryResult: ActivationHistoryResultResolvers<ContextType>;
  Activations: ActivationsResolvers<ContextType>;
  AddDeviceResult: AddDeviceResultResolvers<ContextType>;
  AddNetworkContractResult: AddNetworkContractResultResolvers<ContextType>;
  AddProductDealResult: AddProductDealResultResolvers<ContextType>;
  AeonAuth: AeonAuthResolvers<ContextType>;
  AeonResult: AeonResultResolvers<ContextType>;
  AgentRequestResult: AgentRequestResultResolvers<ContextType>;
  AirtimeTopupResult: AirtimeTopupResultResolvers<ContextType>;
  AllocateStockResult: AllocateStockResultResolvers<ContextType>;
  AuthResetPasswordPayload: AuthResetPasswordPayloadResolvers<ContextType>;
  AuthValidationLegacyPayload: AuthValidationLegacyPayloadResolvers<ContextType>;
  AuthValidationPayload: AuthValidationPayloadResolvers<ContextType>;
  BankDetail: BankDetailResolvers<ContextType>;
  BankDetails: BankDetailsResolvers<ContextType>;
  BankDetailsEdge: BankDetailsEdgeResolvers<ContextType>;
  BankDetailsNew: BankDetailsNewResolvers<ContextType>;
  Banner: BannerResolvers<ContextType>;
  BannerEdge: BannerEdgeResolvers<ContextType>;
  BannersResult: BannersResultResolvers<ContextType>;
  Bundle: BundleResolvers<ContextType>;
  BundleNetwork: BundleNetworkResolvers<ContextType>;
  BundlesEdge: BundlesEdgeResolvers<ContextType>;
  BusCarrierLocation: BusCarrierLocationResolvers<ContextType>;
  BusCarriersConnection: BusCarriersConnectionResolvers<ContextType>;
  BusCarriersEdge: BusCarriersEdgeResolvers<ContextType>;
  BusCustomerInfo: BusCustomerInfoResolvers<ContextType>;
  BusDestinationLocation: BusDestinationLocationResolvers<ContextType>;
  BusDestinationsConnection: BusDestinationsConnectionResolvers<ContextType>;
  BusDestinationsEdge: BusDestinationsEdgeResolvers<ContextType>;
  BusFare: BusFareResolvers<ContextType>;
  BusFaresConnection: BusFaresConnectionResolvers<ContextType>;
  BusFaresEdge: BusFaresEdgeResolvers<ContextType>;
  BusGetCustomerPayload: BusGetCustomerPayloadResolvers<ContextType>;
  BusLocation: BusLocationResolvers<ContextType>;
  BusLocationEdge: BusLocationEdgeResolvers<ContextType>;
  BusPass: BusPassResolvers<ContextType>;
  BusPassEdge: BusPassEdgeResolvers<ContextType>;
  BusPassPicesLookUpConnection: BusPassPicesLookUpConnectionResolvers<ContextType>;
  BusPassPrice: BusPassPriceResolvers<ContextType>;
  BusPassPriceEdge: BusPassPriceEdgeResolvers<ContextType>;
  BusPassType: BusPassTypeResolvers<ContextType>;
  BusPassTypeEdge: BusPassTypeEdgeResolvers<ContextType>;
  BusPassTypesConnection: BusPassTypesConnectionResolvers<ContextType>;
  BusPassesLookUpConnection: BusPassesLookUpConnectionResolvers<ContextType>;
  BusStopLocation: BusStopLocationResolvers<ContextType>;
  BusStopsConnection: BusStopsConnectionResolvers<ContextType>;
  BusStopsEdge: BusStopsEdgeResolvers<ContextType>;
  BusTicket: BusTicketResolvers<ContextType>;
  BusTicketCancelPayload: BusTicketCancelPayloadResolvers<ContextType>;
  BusTicketCheckoutPayload: BusTicketCheckoutPayloadResolvers<ContextType>;
  BusTicketConfirmCancelPayload: BusTicketConfirmCancelPayloadResolvers<ContextType>;
  BusTicketConfirmPayload: BusTicketConfirmPayloadResolvers<ContextType>;
  BusTicketLocation: BusTicketLocationResolvers<ContextType>;
  BusTicketLookUpConnection: BusTicketLookUpConnectionResolvers<ContextType>;
  BusTicketsConnection: BusTicketsConnectionResolvers<ContextType>;
  BusTicketsEdge: BusTicketsEdgeResolvers<ContextType>;
  BusUpdateCustomerPayload: BusUpdateCustomerPayloadResolvers<ContextType>;
  Card: CardResolvers<ContextType>;
  CheckStockInfoResult: CheckStockInfoResultResolvers<ContextType>;
  CheckVoucherInfoResult: CheckVoucherInfoResultResolvers<ContextType>;
  Commission: CommissionResolvers<ContextType>;
  CommissionEdge: CommissionEdgeResolvers<ContextType>;
  CommissionsConnection: CommissionsConnectionResolvers<ContextType>;
  ConfirmMeterDetail: ConfirmMeterDetailResolvers<ContextType>;
  ConfirmMeterResult: ConfirmMeterResultResolvers<ContextType>;
  ConsumerProfileResult: ConsumerProfileResultResolvers<ContextType>;
  Country: CountryResolvers<ContextType>;
  Customer: CustomerResolvers<ContextType>;
  CustomerContractsResult: CustomerContractsResultResolvers<ContextType>;
  CustomerList: CustomerListResolvers<ContextType>;
  CustomerListEdge: CustomerListEdgeResolvers<ContextType>;
  CustomerListNew: CustomerListNewResolvers<ContextType>;
  CustomerListNewEdge: CustomerListNewEdgeResolvers<ContextType>;
  CustomerOrderResult: CustomerOrderResultResolvers<ContextType>;
  Data: DataResolvers<ContextType>;
  DataBundlesNetworkResult: DataBundlesNetworkResultResolvers<ContextType>;
  DataBundlesResult: DataBundlesResultResolvers<ContextType>;
  DataTopupResult: DataTopupResultResolvers<ContextType>;
  DateTime: GraphQLScalarType;
  Details: DetailsResolvers<ContextType>;
  Device: DeviceResolvers<ContextType>;
  DeviceEdge: DeviceEdgeResolvers<ContextType>;
  DeviceType: DeviceTypeResolvers<ContextType>;
  DevicesResult: DevicesResultResolvers<ContextType>;
  DummyNode: DummyNodeResolvers<ContextType>;
  ElectricityTopupResult: ElectricityTopupResultResolvers<ContextType>;
  FmcgDistributor: FmcgDistributorResolvers<ContextType>;
  FmcgDistributorResult: FmcgDistributorResultResolvers<ContextType>;
  FmcgPaymentResult: FmcgPaymentResultResolvers<ContextType>;
  FmcgPaymentResultDetail: FmcgPaymentResultDetailResolvers<ContextType>;
  FmcgSuppliers: FmcgSuppliersResolvers<ContextType>;
  FmcgSuppliersResult: FmcgSuppliersResultResolvers<ContextType>;
  IABundleTopupDataResult: IaBundleTopupDataResultResolvers<ContextType>;
  IABundleTopupResult: IaBundleTopupResultResolvers<ContextType>;
  IAProduct: IaProductResolvers<ContextType>;
  IARecon: IaReconResolvers<ContextType>;
  IAReprintResult: IaReprintResultResolvers<ContextType>;
  IATopupResult: IaTopupResultResolvers<ContextType>;
  IdentityType: IdentityTypeResolvers<ContextType>;
  Images: ImagesResolvers<ContextType>;
  InternationalAirtimeTopupResult: InternationalAirtimeTopupResultResolvers<ContextType>;
  MSISDNValidationDataResult: MsisdnValidationDataResultResolvers<ContextType>;
  MSISDNValidationResult: MsisdnValidationResultResolvers<ContextType>;
  MerchantOrderResult: MerchantOrderResultResolvers<ContextType>;
  MerchantToMerchantInfo: MerchantToMerchantInfoResolvers<ContextType>;
  MerchantToMerchantResult: MerchantToMerchantResultResolvers<ContextType>;
  MerchantToMerchantTransferResult: MerchantToMerchantTransferResultResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Network: NetworkResolvers<ContextType>;
  NetworkEdge: NetworkEdgeResolvers<ContextType>;
  NetworksResult: NetworksResultResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  Order: OrderResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  PaymentMethod: PaymentMethodResolvers<ContextType>;
  Product: ProductResolvers<ContextType>;
  ProductByEntity: ProductByEntityResolvers<ContextType>;
  ProductByEntityEdge: ProductByEntityEdgeResolvers<ContextType>;
  ProductByNetwork: ProductByNetworkResolvers<ContextType>;
  ProductDeal: ProductDealResolvers<ContextType>;
  ProductDealList: ProductDealListResolvers<ContextType>;
  ProductDealListEdge: ProductDealListEdgeResolvers<ContextType>;
  Products: ProductsResolvers<ContextType>;
  ProductsByEntity: ProductsByEntityResolvers<ContextType>;
  ProductsByNetworkEdge: ProductsByNetworkEdgeResolvers<ContextType>;
  ProductsByNetworkResult: ProductsByNetworkResultResolvers<ContextType>;
  ProductsList: ProductsListResolvers<ContextType>;
  ProductsListEdge: ProductsListEdgeResolvers<ContextType>;
  ProductsListResult: ProductsListResultResolvers<ContextType>;
  Profile: ProfileResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  ReceiveStockNewResult: ReceiveStockNewResultResolvers<ContextType>;
  ReceiveStockResult: ReceiveStockResultResolvers<ContextType>;
  RegisterAgentResult: RegisterAgentResultResolvers<ContextType>;
  RegisterConsumerBydResult: RegisterConsumerBydResultResolvers<ContextType>;
  RegisterConsumerResult: RegisterConsumerResultResolvers<ContextType>;
  RepTransferResult: RepTransferResultResolvers<ContextType>;
  Reprint: ReprintResolvers<ContextType>;
  ReprintConnection: ReprintConnectionResolvers<ContextType>;
  ReprintEdge: ReprintEdgeResolvers<ContextType>;
  ReprintReceipt: ReprintReceiptResolvers<ContextType>;
  ReprintReceiptConnection: ReprintReceiptConnectionResolvers<ContextType>;
  Response: ResponseResolvers<ContextType>;
  RicaRegisterResult: RicaRegisterResultResolvers<ContextType>;
  Role: RoleResolvers<ContextType>;
  RouteRecursor: RouteRecursorResolvers<ContextType>;
  SalesOrderList: SalesOrderListResolvers<ContextType>;
  SalesOrderListEdge: SalesOrderListEdgeResolvers<ContextType>;
  SellStockResult: SellStockResultResolvers<ContextType>;
  SetPrintedAndTenderResult: SetPrintedAndTenderResultResolvers<ContextType>;
  Stock: StockResolvers<ContextType>;
  StockInfo: StockInfoResolvers<ContextType>;
  StockList: StockListResolvers<ContextType>;
  StockListEdge: StockListEdgeResolvers<ContextType>;
  StockListNew: StockListNewResolvers<ContextType>;
  StockListNewEdge: StockListNewEdgeResolvers<ContextType>;
  StockReceive: StockReceiveResolvers<ContextType>;
  StockReceiveList: StockReceiveListResolvers<ContextType>;
  StockReceiveListEdge: StockReceiveListEdgeResolvers<ContextType>;
  StockReceiveListNew: StockReceiveListNewResolvers<ContextType>;
  StockReceiveListNewEdge: StockReceiveListNewEdgeResolvers<ContextType>;
  SvcBlockOutput: SvcBlockOutputResolvers<ContextType>;
  SvcUpdate: SvcUpdateResolvers<ContextType>;
  TenderAccountResult: TenderAccountResultResolvers<ContextType>;
  Ticket: TicketResolvers<ContextType>;
  Transaction: TransactionResolvers<ContextType>;
  TransactionEdge: TransactionEdgeResolvers<ContextType>;
  Transactions: TransactionsResolvers<ContextType>;
  TransactionsConnection: TransactionsConnectionResolvers<ContextType>;
  UpdateNetworkContractResult: UpdateNetworkContractResultResolvers<ContextType>;
  UploadDocumentResult: UploadDocumentResultResolvers<ContextType>;
  UploadImageResult: UploadImageResultResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserPerformance: UserPerformanceResolvers<ContextType>;
  ValidateBoxResult: ValidateBoxResultResolvers<ContextType>;
  ValidateProductResult: ValidateProductResultResolvers<ContextType>;
  VerifyStockReceivedResult: VerifyStockReceivedResultResolvers<ContextType>;
  VoucherListEdge: VoucherListEdgeResolvers<ContextType>;
  VoucherListResult: VoucherListResultResolvers<ContextType>;
  VoucherRedemptionPayload: VoucherRedemptionPayloadResolvers<ContextType>;
  Vouchers: VouchersResolvers<ContextType>;
  VouchersTopUpResult: VouchersTopUpResultResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  relayId: RelayIdDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>;