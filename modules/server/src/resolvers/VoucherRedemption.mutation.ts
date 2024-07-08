import {VoucherApi} from '@blts/bluelabel-social-relief-of-distress';
import {ClientError} from '@stackworx/express';
import * as yup from 'yup';
import {MutationResolvers} from '../generated/graphql';
import config from '../config';
const ErrorSchema = yup
  .object({
    error: yup.string().required(),
    message: yup.string().required(),
    path: yup.string().required(),
    status: yup.number().required(),
    timestamp: yup.string().required(),
  })
  .required();
export const voucherRedemption: MutationResolvers['voucherRedemption'] = async function (
  _parent,
  {
    input: {
      username,
      consumerIdNumber,
      requestId,
      mobileNumber,
      password,
      voucherNumber,
      transactionType,
      amount,
      clientMutationId,
    },
  },
  _context,
  _info
) {
  const api = new VoucherApi(config.get('gatewayAddress'));
  try {
    const auth =
      'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    const result = await api.redeemSocialReliefOfDistressVoucherUsingPOST(
      {
        requestId,
        amount,
        // @ts-expect-error
        transactionType,
        mobileNumber: mobileNumber,
        consumerIdNumber: consumerIdNumber ?? undefined,
        voucherNumber,
      },
      {
        headers: {
          authorization: auth,
        },
      }
    );
    return {
      clientMutationId,
      balance: result.body.amount ?? null,
      dateTime: result.body.dateTime ?? null,
      reference: result.body.reference ?? null,
      requestId: result.body.requestId ?? null,
    };
  } catch (ex) {
    // TODO: handle invalid error
    try {
      const error = ErrorSchema.validateSync(ex.body);
      throw new ClientError(error.message, error.status);
    } catch (ex1) {
      throw ex1;
    }
  }
};
