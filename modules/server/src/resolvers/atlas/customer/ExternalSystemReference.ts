import {CustomersApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {Context} from '../../../Context';
import {createLogger} from '../../../logging';
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

const logger = createLogger('ExternalSystemReference');

export async function saveExternalSystemReference(
  context: Context,
  headers: any,
  id: number,
  customerId: number,
  ref: number,
  data: string,
  appId: any
) {
  const serverUrl = String(await getTenant(appId));

  const customerApi = new CustomersApi(
    new Configuration({basePath: serverUrl})
  );

  return await customerApi
    .registerExternalSystemReference(
      id.toString(),
      customerId.toString(),
      ref.toString(10),
      data,
      headers
    )
    .then((res) => res.data)
    .catch((error) => {
      logger.error(context, {message: error.message, error});
      throw Error('Unable to save reference');
    });
}

export async function updateExternalSystemReference(
  context: Context,
  headers: any,
  id: number,
  ref: string,
  data: string,
  appId: any
) {
  const serverUrl = String(await getTenant(appId));

  const customerApi = new CustomersApi(
    new Configuration({basePath: serverUrl})
  );
  return await customerApi
    .updateExternalSystemReference(id.toString(), ref.toString(), data, headers)
    .then((res) => res.data)
    .catch((error) => {
      logger.error(context, {message: error.message, error});
      throw Error('Unable to update reference');
    });
}
