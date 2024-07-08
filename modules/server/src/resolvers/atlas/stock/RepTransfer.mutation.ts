import {RepApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import config from '../../../config';

/*
mutation {
  repTransfer(input: { transfer :[
    {
      product_id: "8"
      qty: "1"
    }
  ],appId:""
}) {
    success
    message
  }
}
*/

export const repTransfer: MutationResolvers['repTransfer'] = async function (
  _parent: any,
  {input: {transfer, appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);
    let serverUrl = config.get('atlasAddress');
    if (appId) {
      serverUrl = String(await getTenant(appId));
    }
    const api = new RepApi(new Configuration({basePath: serverUrl}));
    console.log(transfer);
    const repTransferResult = await api
      .createReptransfer(transfer, headers)
      .then((res) => res.data);

    const success = repTransferResult.success;
    return {success, message: 'Success'};
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
