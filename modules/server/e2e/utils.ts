import request from 'supertest';

// import tracer from '../src/tracer';

import {app} from '../src/commands/express';
import {GraphQLError} from 'graphql';

export {app} from '../src/commands/express';

// export const createTestContext = async (_user?: unknown) => {
//   return {
//     // user: user ? user : await getSystemUser(),
//     span: tracer.startSpan('test'),
//   };
// };

export const defaultUser = 'test-user@stackworx.io';
export const defaultAdmin = 'super-admin-user@stackworx.io';

/*
export const getSystemUser = async (): Promise<User> => {
  const systemUser = await User.query()
    .context({
      user: {id: -1},
      span: tracer.startSpan('test'),
    })
    .findOne({username: 'system'});
  expect(systemUser).toBeDefined();
  return systemUser!;
};
*/

export async function post({
  path = '',
  data,
  token,
  status = 200,
}: {
  path: string;
  data?: any;
  status?: number;
  headers?: {[key: string]: string};
  token?: string;
}) {
  let r = request(app)
    .post(path)
    .send(data)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  if (token) {
    r.set('Authorization', `Bearer ${token}`);
  }

  const result = await r;

  if (result.status !== status) {
    fail(
      `Expected Status: ${status}, Got: ${
        result.status
      }, Body: ${JSON.stringify(result.body, null, 2)}`
    );
  }

  return result.body;
}

export async function graphqlQuery<T = {}>({
  query,
  variables = {},
  token,
}: {
  query: string;
  variables?: any;
  token?: string;
}): Promise<{errors?: GraphQLError[]; data: T}> {
  return post({
    path: '/graphql',
    data: {
      query,
      variables,
    },
    token,
  });
}

export async function authenticate(
  username: string,
  password: string = 'password'
): Promise<string> {
  // when
  const {access_token: accessToken} = await post({
    path: '/login',
    data: {
      username,
      password,
    },
  });

  return accessToken;
}

export async function globalTeardown() {}

export async function setup() {}

export const tearDown = async () => {};
