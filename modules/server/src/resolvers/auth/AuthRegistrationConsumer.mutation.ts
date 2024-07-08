import {ConsumersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../config';
import {MutationResolvers} from '../../generated/graphql';
import {atlasAuthCheck} from './AtlasHelpers';

//TODO: this mutation is to be removed, it is replaced by RegisterConsumer as this includes the Digital Onboarding flow
//leaving this mutation for now so as not to break front-end, but those changes need to be implemented

export const authRegistrationConsumer: MutationResolvers['authRegistrationConsumer'] = async function (
  _parent,
  {
    input: {
      username,
      password,
      email,
      firstName,
      lastName,
      name,
      identityTypeId,
      identityReference,
      identityReferenceExpiryDate,
      identityReferenceOriginCountry,
      paymentMethodId,
    },
  },
  context,
  _info
) {
  try {
    const api = new ConsumersApi(
      new Configuration({basePath: config.get('atlasAddress')})
    );
    const headers = atlasAuthCheck(context);

    // const uri = `${config.get(
    //   'atlasAddress'
    // )}/api/v1/consumer/register?username=${username}&password=${password}&email=${email}&first_name=${firstName}&last_name=${lastName}&name=${name}&identity_type_id=${identityTypeId}&identity_reference=${identityReference}&identity_reference_expiry_date=${identityReferenceExpiryDate}&identity_reference_origin_country=${identityReferenceOriginCountry}&payment_method_id=${paymentMethodId}`;

    const output = await api
      .consumerRegister(
        username,
        password,
        email,
        firstName,
        lastName,
        name,
        identityTypeId,
        identityReference,
        paymentMethodId,
        identityReferenceExpiryDate,
        identityReferenceOriginCountry,
        headers
      )
      .then((res) => {
        return res.data;
      });

    if (output && output.cust_code) {
      return {
        success: true,
        output: output.cust_code,
        name: output.name,
        groupId: output.group_id,
        identityTypeId: output.identity_type_id,
        paymentMethodId: output.payment_method_id,
        identityReference: output.identity_reference,
        vatRegistered: output.vat_registered,
        isActive: output.is_active,
        userId: output.user_id,
        repUserId: output.rep_user_id,
        identityReferenceExpiryDate: output.identity_reference_expiry_date,
        identityReferenceOriginCountry:
          output.identity_reference_origin_country,
        updatedAt: output.updated_at,
        createdAt: output.created_at,
        id: output.id,
      };
    } else {
      return {
        success: false,
        output: null,
        name: null,
        groupId: null,
        identityTypeId: null,
        paymentMethodId: null,
        identityReference: null,
        vatRegistered: null,
        isActive: null,
        userId: null,
        repUserId: null,
        identityReferenceExpiryDate: null,
        identityReferenceOriginCountry: null,
        updatedAt: null,
        createdAt: null,
        id: null,
      };
    }
  } catch (ex) {
    return {
      success: false,
      output: null,
      name: null,
      groupId: null,
      identityTypeId: null,
      paymentMethodId: null,
      identityReference: null,
      vatRegistered: null,
      isActive: null,
      userId: null,
      repUserId: null,
      identityReferenceExpiryDate: null,
      identityReferenceOriginCountry: null,
      updatedAt: null,
      createdAt: null,
      id: null,
    };
  }
};
