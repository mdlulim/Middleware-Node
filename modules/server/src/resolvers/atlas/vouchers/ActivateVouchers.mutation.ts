import {VouchersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {MutationResolvers} from '../../../generated/graphql';
import {atlasAuthCheck} from '../../auth/AtlasHelpers';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';

/*

mutation {
  activateVoucher(input: {
    order: [
        {
          barcode: [
            "1234567890",
          ]
     }],
    appId
  }) {
    success
    message
  }
}
*/

export const activateVoucher: MutationResolvers['activateVoucher'] = async function (
  _parent: any,
  {input: {order, appId}},
  context: Context,
  _info: any
) {
  try {
    const headers = atlasAuthCheck(context);

    const serverUrl = String(await getTenant(appId));

    const data = order.map((box) => ({
      barcode: box.barcode,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const repApi = new VouchersApi(new Configuration({basePath: serverUrl}));

    const allocateResult = await repApi
      .activateVouchers(Object(data), headers)
      .then((res) => res.data);
    console.log(allocateResult);
    const success = allocateResult.status;

    return {success: success, message: allocateResult.Message};
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
