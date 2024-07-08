import {OrderApi, UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {BaseContext} from '../../Context';

interface AtlasMode {
  id: number;
  name: string;
  status: string;
  process: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

function atlasAuthCheck(info: BaseContext) {
  // @ts-ignore
  const auth: string | undefined =
    info &&
    info.req && //info.req.headers.authorization ||
    info.req.headers.atlasauth;

  if (!auth) {
    throw Error('No auth token provided for Atlas call');
  }
  return {headers: {authorization: auth}};
}

async function getWarehouseId(headers: any, baseUrl: string) {
  const userApi = new UserApi(new Configuration({basePath: baseUrl}));
  return await userApi
    .getProfile(headers)
    .then((res) => res.data.data.warehouse_id)
    .catch((_err) => {
      throw Error('Unable to get warehouse');
    });
}

async function getDeliveryModeId(
  headers: any,
  delivery: string,
  baseUrl: string
) {
  const orderApi = new OrderApi(new Configuration({basePath: baseUrl}));
  return await orderApi
    .getdeliveryModes(headers)
    .then((res) => res.data.data.find((d: AtlasMode) => d.name === delivery).id)
    .catch((_err) => {
      throw Error('Unable to get delivery mode');
    });
}

async function getPaymentModeId(
  headers: any,
  payment: string,
  baseUrl: string
) {
  const orderApi = new OrderApi(new Configuration({basePath: baseUrl}));

  return await orderApi
    .getpaymentModes(headers)
    .then((res) => res.data.data.find((p: AtlasMode) => p.name === payment).id)
    .catch((_err) => {
      throw Error('Unable to get payment mode');
    });
}

export {atlasAuthCheck, getWarehouseId, getDeliveryModeId, getPaymentModeId};
