import {CustomersApi, MerchantApi, SystemApi} from '@blts/atlas-api-def';

import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {getTenant} from '../../auth/tenant';

export async function getExternalSystemReference(
  headers: any,
  id: number,
  appId: any
) {
  const serverUrl = String(await getTenant(appId));

  const customerApi = new CustomersApi(
    new Configuration({basePath: serverUrl})
  );

  return await customerApi
    .getExternalSystemReference(id.toString(), headers)
    .then((res) => res.data)
    .catch((_err) => {
      throw Error('Unable to get reference');
    });
}

export async function getExternalSystemReferenceForCurrentMerchant(
  headers: any,
  appId: any
) {
  const serverUrl = String(await getTenant(appId));

  const merchantApi = new MerchantApi(new Configuration({basePath: serverUrl}));

  return await merchantApi
    .getExternalSystemReferencesForCurrentMerchant(headers)
    .then((res) => res.data)
    .catch((_err) => {
      throw Error('Unable to get references');
    });
}

export async function getExternalSystem(headers: any, appId: any) {
  const serverUrl = String(await getTenant(appId));
  const externalApi = new SystemApi(new Configuration({basePath: serverUrl}));

  return await externalApi
    .getExternalSystems(headers)
    .then((res) => res.data)
    .catch((_err) => {
      throw Error('Unable to get reference');
    });
}

export async function getExternalSystemRef(headers: any, appId: any) {
  const serverUrl = String(await getTenant(appId));
  const externalApi = new CustomersApi(
    new Configuration({basePath: serverUrl})
  );
  return await externalApi
    .getExternalSystemReference(headers)
    .then((res) => res.data)
    .catch((_err) => {
      throw Error('Unable to get reference');
    });
}
