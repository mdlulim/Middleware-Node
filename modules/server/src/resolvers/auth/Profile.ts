import {UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../config';
import {QueryResolvers} from '../../generated/graphql';
import {atlasAuthCheck} from './AtlasHelpers';

interface Role {
  id: string;
  description: string;
  slug: string;
}

// @ts-ignore
export const profile: QueryResolvers['profile'] = async function (
  _parent,
  _context,
  info
) {
  try {
    const headers = atlasAuthCheck(info);
    const api = new UserApi(
      new Configuration({basePath: config.get('atlasAddress')})
    );
    const profileResult = await api.getProfile(headers).then((res) => res.data);
    const typesResult = await api.getTypes(headers).then((res) => res.data);

    const {
      id: roleId,
      description: roleDescription,
      slug: roleSlug,
    } = typesResult.data.find(
      (role: Role) => role.id == profileResult.data.data.user_type_id
    );

    return {
      id: profileResult.data.data.id,
      username: profileResult.data.data.username,
      firstName: profileResult.data.data.first_name,
      lastName: profileResult.data.last_name,
      email: profileResult.data.email,
      identityReference: profileResult.data.customer.identity_reference,
      cellNumber: profileResult.data.customer.contacts[0].cell_no,
      userType: {
        id: roleId,
        description: roleDescription,
        slug: roleSlug,
      },
    };
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
};
