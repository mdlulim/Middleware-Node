interface Request {
  deviceId: string;
  userPin: string;
  serialNumber: string;
  deviceUUID: string;
  devUserId: string;
}

export interface LookUpRequest extends Request {
  requestId: string;
  orderRedeemRef: string;
}

export interface RedeemRequest extends Request {
  requestId: string;
  orderRedeemRef: string;
  amount: number;
  secretCode: number;
  merchantTrxId: string;
  providerTrxId: string;
  merchantId: number;
}

export interface ConfirmRequest extends Request {
  id: string;
  orderRedeemRef: string;
  merchantTrxId: string;
  providerTrxId: string;
  merchantId: number;
  amount: number;
}
