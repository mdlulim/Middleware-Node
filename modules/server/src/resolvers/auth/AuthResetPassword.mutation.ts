import {LoginApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import config from '../../config';
import {MutationResolvers} from '../../generated/graphql';
import {getTenant} from './tenant';

/*
 mutation PasswordResetScreenMutation {
        authResetPassword(input: {
          method:SMS
          detail :"mel333"
          appID:""
        }) {
          success
        }
      }
      */
interface CommsDataType {
  id: number;
  name: 'Mail Channel' | 'SMS Channel';
  status: 'mail_channel' | 'sms_channel';
  process: 'password_reset_channel';
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
}
console.log(config.toString());

// helper function to facilitate getting the comms channel
async function getCommsChannel(
  value: string,
  type: 'name' | 'status',
  appId: any
) {
  let serverurl = config.get('atlasAddress');

  if (appId) {
    serverurl = String(await getTenant(appId));
  }

  const api = new LoginApi(new Configuration({basePath: serverurl}));

  const commsListDataArrayResult: CommsDataType[] = await api
    .getCommsChannels({headers: {}})
    .then((res) => res.data);

  if (!commsListDataArrayResult) {
    // todo log message didn't find atlas comms list
    return false;
  }

  // ES6 array iterator to find and isolate only the comm being searched for
  // @ts-ignore
  const commsChannel: number = commsListDataArrayResult.data.find((comm) => {
    return comm[type] === value;
  }).id;

  if (!commsChannel) {
    // todo log message couldn't find comms channel
    return false;
  }

  return commsChannel.toString();
}

async function resetViaEmail(
  username: string,
  clientMutationId: string,
  appId: any
) {
  const commsChannel = await getCommsChannel('mail_channel', 'status', appId);

  // if unable to get the comms channel, don't progress
  if (!commsChannel) {
    return {success: false, clientMutationId};
  }

  let serverurl = config.get('atlasAddress');

  if (appId) {
    serverurl = String(await getTenant(appId));
    console.log('inside method');
  }

  const api = new LoginApi(new Configuration({basePath: serverurl}));

  const resetEmailResult = await api
    .forgotPassword(
      username, // username,
      commsChannel,
      {headers: {}}
    )
    .then((res) => {
      return res.data.status;
    });
  return {success: resetEmailResult, clientMutationId};
}

async function resetViaSMS(
  username: string,
  clientMutationId: string,
  appId: any
) {
  const commsChannel = await getCommsChannel('sms_channel', 'status', appId);

  // if unable to get the comms channel, don't progress
  if (!commsChannel) {
    return {success: false, clientMutationId};
  }

  let serverurl = config.get('atlasAddress');

  if (appId) {
    serverurl = String(await getTenant(appId));
    console.log('inside method');
  }

  const api = new LoginApi(new Configuration({basePath: serverurl}));

  const resetSMSResult = await api
    .forgotPassword(
      username, // username,
      commsChannel,
      {headers: {}}
    )
    .then((res) => {
      return res.data.status;
    });
  return {success: resetSMSResult, clientMutationId};
}

export const authResetPassword: MutationResolvers['authResetPassword'] = async function (
  _parent,
  {input: {detail, method, clientMutationId, appId}},
  _context,
  _info
) {
  try {
    switch (method) {
      case 'EMAIL': {
        const result = await resetViaEmail(
          detail,
          clientMutationId || '',
          appId
        );
        return result;
      }
      case 'SMS': {
        const result = await resetViaSMS(detail, clientMutationId || '', appId);
        return result;
      }
      default:
        return {success: false, clientMutationId: clientMutationId || ''};
    }
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return {success: false, clientMutationId: clientMutationId || ''};
  }
};
