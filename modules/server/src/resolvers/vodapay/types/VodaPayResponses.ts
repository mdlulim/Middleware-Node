import Amount from './VodaPayAmountInterface';
import {PrintLines} from './VodaPayPrintLineInterface';

interface Response {
  id: string;
  originalId: string;
  requestId: string;
  replyCode: string;
  replyMessage: string;
  deviceId: string;
  providerErrorCode: string;
  providerErrorMessage: string;
}

export interface LookUpResponse extends Response {
  amount: Amount;
  status: string;
  statusDescription: string;
  isSufficientFunds: boolean;
  trxId: number;
  apiExecutionId: number;
}

export interface RedeemResponse extends Response {
  time: string;
  rrn: string;
  amount: Amount;
  orderId: string;
  apiExecutionId: number;
}

export interface ConfirmResponse extends Response {
  time: string;
  trxId: string;
  orderRedeemRef: string;
  printLines: PrintLines;
  merchantPrintLines: PrintLines;
}
