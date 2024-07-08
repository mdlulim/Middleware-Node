import got from 'got';
import config from '../../config';

const env = `${config.get('env')}`;
const stage = `${config.get('stage')}`;

export function getBaseURL(): string {
  if (stage === 'development' || stage === 'local' || env === 'development') {
    return `${config.get('vodaPay.localURL')}`;
  } else if (stage === 'qa' || stage === 'test' || env === 'test') {
    return `${config.get('vodaPay.qaURL')}`;
  } else if (stage === 'production' || env === 'production') {
    return `${config.get('vodaPay.prodURL')}}`;
  }

  return `${config.get('vodaPay.localURL')}${config.get('vodaPay.subpath')}`;
}

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export default async function getAccessToken(): Promise<string> {
  let resp: AccessTokenResponse;
  if (stage === 'qa' || stage === 'test' || env === 'test') {
    resp = await got
      .post('https://api.qa.cloud.bluelabeltelecoms.co.za/token', {
        searchParams: {
          client_id: 'tIPqPcoU2Ax9xgv7tnmkloIHPC4a',
          client_secret: 'MX3oezy_jcvn8uG1yJ2bLPuTytsa',
          grant_type: 'client_credentials',
        },
      })
      .json();
  } else if (stage === 'production' || env === 'production') {
    resp = await got
      .post('', {
        searchParams: {
          client_id: '',
          client_secret: '',
          grant_type: '',
        },
      })
      .json();
  } else {
    resp = await got
      .post(getBaseURL() + '/oauth/token', {
        searchParams: {
          client_id: '20<od4P@7Ca5h0u724',
          client_secret:
            'eIsImtpZ8Lu31@8elI7ywLc@91T3C9uDmGmoS3npQi6ImsxMjM0C@5hNSJ9',
          grant_type: 'client_credentials',
        },
      })
      .json();
  }

  return resp.access_token;
}

export function getURL(): string {
  if (stage === 'development' || stage === 'local' || env === 'development') {
    return `${config.get('vodaPay.localURL')}${config.get('vodaPay.subpath')}`;
  } else if (stage === 'qa' || stage === 'test' || env === 'test') {
    return `${config.get('vodaPay.qaURL')}${config.get('vodaPay.subpath')}`;
  } else if (stage === 'production' || env === 'production') {
    return `${config.get('vodaPay.prodURL')}${config.get('vodaPay.subpath')}`;
  }

  return `${config.get('vodaPay.localURL')}${config.get('vodaPay.subpath')}`;
}
