import {SystemApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../config';
import {QueryResolvers} from '../../generated/graphql';
import {atlasAuthCheck} from './AtlasHelpers';

// @ts-ignore
export const countries: QueryResolvers['countries'] = async function (
  _parent,
  _context,
  info
) {
  try {
    const headers = atlasAuthCheck(info);
    const api = new SystemApi(
      new Configuration({basePath: config.get('atlasAddress')})
    );
    const countryResult = await api
      .getContries(headers)
      .then((res) => res.data);

    return countryResult;
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
};
