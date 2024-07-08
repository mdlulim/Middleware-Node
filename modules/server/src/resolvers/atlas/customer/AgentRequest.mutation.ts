import axios from 'axios';
import {Context} from '../../../Context';
import {getTenant} from '../../auth/tenant';
import {MutationResolvers} from '../../../generated/graphql';

/*
mutation {
  agentRequest(input: {appId:"T3TSA"}) {
          success
          message
  }
}
 */

export const agentRequest: MutationResolvers['agentRequest'] = async function (
  _parent: any,
  {input: {appId}},
  context: Context
) {
  try {
    const authToken = context && context.req && context.req.headers.atlasauth;
    const serverUrl = String(await getTenant(appId));
    const uri = `${serverUrl}/api/v1/consumer/agent_request`;
    const config = {
      method: 'post',
      url: uri,
      headers: {
        Accept: 'application/json',
        Authorization: `${authToken}`, //"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjA2NGFiOTM5M2ZiNDAyODdkNTQ4M2VmZTNkZDhlOGMyZDVkZWUxOWE0ODQyNjQ5ZjliMmQyYWIwODZmNDQ3MTA3YWY2YjlkYzhiOTMxZjMiLCJpYXQiOjE3MDkwMzczNDAuNzYyNDI0LCJuYmYiOjE3MDkwMzczNDAuNzYyNDI3LCJleHAiOjE3MDkwMzc2NDAuNzUwNjQxLCJzdWIiOiI0NyIsInNjb3BlcyI6WyIqIl19.RfoTuy9pBFWQ-CKyc-dayzz5xuv9LWRcBZfB4Hl7WxDq8C8Qd8-B7g1m2qG4wYcaIR9teKCUhsP6uWzkvUOlOfO1tGq4FTKPjii5xO3SvXQaVILc3PYk5VPYjFtCldBlEHwbTTl8b6tCul87yITZ3TCc9adKh2qFRom5cjlrhTF7Eer7gVjs9SwoI3srEVEJD-1_ZUZmJyUKC9X0fEMrloLBROxGk-xlMu7OcmEYG2GuA86xS_6xBiQtBb00Yk17QXbVBwTFk9dq2txc3ILx7T5RtpKfjvO4T3Uk38ckVSLn1FgpqOCose4Z1g_E2VPswgFbnKgeaJGtSAIlCPEbLGotKygrugaJBww1AYrJiVha8qsV2Edm8DUEwxU4IbeHs2606TcjdeE6WYwi2g7PFY_Fi59FPqI6vLpXEZZRbjmBdDqboPyqLmWpM_kcbCloNlGNgWsyB3x9ZK3o2_oMhQxwK0a_myCqV8BZTswogD_gAWjhLAR7vx8j46SXKiwnoRuQgnPYFPy4M6W5k4lZTglqk4ZyXn0674G6kyKqdKeNuz-3wHyocDsZpBwOFIn7WUyPhwFyraGke0nJwCVq-2Dg-__KHcUANEDEcmsH8z_TTrQXPJWkAl__qBJOY_L8v_xwyoI0vcsM4BFGKjoq5m10D9dwo02j1kuh6dO1QTI",
      },
      maxBodyLength: Infinity,
    };

    // @ts-ignore

    const output = await axios
      // @ts-ignore
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error,
        };
      });

    if (output) {
      return {
        success: true,
        message: output.data.msg,
      };
    }

    return {
      success: false,
      message: 'Failed to do request',
    };
  } catch (ex) {
    console.log(ex);
    return {success: false, message: ex.message};
  }
};
