import {CustomersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../config';
import {atlasAuthCheck} from './AtlasHelpers';
import {QueryResolvers} from '../../generated/graphql';

export const identityTypes: QueryResolvers['identityTypes'] = async function (
  _parent,
  _context,
  info
) {
  try {
    const headers = atlasAuthCheck(info);

    const api = new CustomersApi(
      new Configuration({basePath: config.get('atlasAddress')})
    );

    const identityResult = await api
      .getIdentityTypes(headers)
      .then((res) => res.data);

    return identityResult;
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
};
