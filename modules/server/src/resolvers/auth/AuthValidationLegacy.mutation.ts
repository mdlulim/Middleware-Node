import got from 'got';
import {MutationResolvers} from '../../generated/graphql';
import config from '../../config';

const uri = `${config.get('gatewayAddress')}/accounts?balanceonly=true`;

export const authValidationLegacy: MutationResolvers['authValidationLegacy'] = async function (
  _parent,
  {input: {username, password, clientMutationId}}
) {
  try {
    const auth =
      'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    await got.get(uri, {
      headers: {
        authorization: auth,
      },
    });
    return {authorized: true, clientMutationId};
  } catch (ex) {
    console.warn(ex);
    return {authorized: false, clientMutationId};
  }
};
