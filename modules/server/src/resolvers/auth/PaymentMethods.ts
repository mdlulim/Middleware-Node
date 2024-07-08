import {CustomersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../config';
import {QueryResolvers} from '../../generated/graphql';
import {atlasAuthCheck} from './AtlasHelpers';

export const paymentMethods: QueryResolvers['paymentMethods'] = async function (
  _parent,
  _context,
  info
) {
  try {
    const headers = atlasAuthCheck(info);
    const api = new CustomersApi(
      new Configuration({basePath: config.get('atlasAddress')})
    );
    const paymentResult = await api
      .getPaymentMethods(headers)
      .then((res) => res.data);

    return paymentResult;
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
};
