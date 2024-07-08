import https from 'https';
import fs from 'fs';
import path from 'path';
import {createApp} from '@stackworx/express-graphql';
import {Request, Response, json, urlencoded} from 'express';
import {GraphQLError} from 'graphql';
import {GraphQLRequestContext} from 'apollo-server-plugin-base';
import {RequestStart} from '@stackworx/apollo-server-graphql-logging';
import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from '../resolvers/resolvers';

// import {RelayIdDirective} from '../resolvers/directives';
// import tracer from '../tracer';

import {createLogger} from '../logging';
import config from '../config';
import {createContext, createSystemContext} from '../util';
import {Context} from '../Context';
// import '../tracing';

const schemaSDL = fs
  .readFileSync(path.join(__dirname, '../../schema.graphql'))
  .toString();

const startupContext = createSystemContext();

const port = config.get('port');
const debugPort = config.get('debugPort');
const isProduction = config.get('env') === 'production';

const logger = createLogger('express');
const graphqlLogger = createLogger('graphql');

const schema = makeExecutableSchema({
  typeDefs: schemaSDL,
  resolvers,
  schemaDirectives: {
    // relayId: RelayIdDirective,
  },
});

export const {app, debugApp, apolloServer} = createApp<Context>({
  // tracer,
  isProduction,
  schema,
  playground: config.get('stage') != 'production',
  introspection: config.get('stage') != 'production',
  callback: (app) => {
    // TODO: register extra handlers
    // @ts-ignore
    app.use(function (err, req, res, next) {
      if (err) {
        console.error('error', err);
      }
      next(err);
    });
  },
  loggingConfig: {
    debug: (context, log) => {
      graphqlLogger.debug(context, log);
    },
    info: (context, log) => {
      graphqlLogger.info(context, log);
    },
    error: (context, log) => {
      graphqlLogger.error(context, log);
    },
    getUsername(requestContext: GraphQLRequestContext<Context>) {
      if (requestContext.context && requestContext.context.user) {
        return requestContext.context.user.username;
      }
      return 'anonymous';
    },
    reportError(request: RequestStart<Context>, errors: GraphQLError[]) {
      graphqlLogger.error(request.context, {
        message: `Graphql Request Failed: Operation Name: ${request.operationName}`,
        variables: request.variables,
        errors,
      });
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext: async ({req, connection}: any) => {
    if (connection) {
      throw new Error('Websocket authentication not implemented');
      // return createWebSocketContext(user);
    } else {
      return createContext(req);
    }
  },
});

app.use(json({limit: '10mb'}));
app.use(urlencoded({limit: '10mb'}));

app.get('/health', function (_req: Request, res: Response) {
  res.sendStatus(200);
});

if (process.env.NODE_ENV !== 'test') {
  logger.info(startupContext, {
    message: config.toString(),
  });

  const tls = config.get('tls');

  function createServer() {
    const server = https.createServer(
      {
        cert: fs.readFileSync(tls.cert),
        key: fs.readFileSync(tls.key),
      },
      app
    );
    // the following attempts to address the 'read timed out errors' received when interacting with Mendix
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 65 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`
    return server;
  }

  const httpServer = tls.enabled
    ? createServer().listen(port, () => {
        logger.info(startupContext, {message: `Started on port: ${port}.`});
      })
    : app.listen(port, () => {
        logger.info(startupContext, {message: `Started on port: ${port}.`});
      });

  debugApp.listen(debugPort, () => {
    logger.info(startupContext, {
      message: `Debug Started on port: ${debugPort}.`,
    });
  });

  apolloServer.installSubscriptionHandlers(httpServer);
}
