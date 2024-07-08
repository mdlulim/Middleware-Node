// import {describe, test, expect, beforeEach, afterAll} from '@jest/globals';
import {setup, tearDown} from './utils';
beforeEach(async () => setup());
afterAll(async () => tearDown());

describe('sample', () => {
  test('users', async () => {
    /*
    const result = await graphqlQuery({
      query: `
      {
        users {
          edges {
            node {
              username
            }
            cursor
          }
          pageInfo {
            hasNextPage
            startCursor
          }
        }
      }`,
    });

    expect(result).toMatchSnapshot();
    */
  });
});
