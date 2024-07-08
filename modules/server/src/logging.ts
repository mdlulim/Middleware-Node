import * as pino from '@stackworx/pino';
import {BaseContext} from './Context';

const {NODE_ENV} = process.env;
declare module '@stackworx/pino/dist/context' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Context extends BaseContext {}
}
const rootLogger = pino.createLogger({
  extractContextAttributes: (ctx) => {
    const {req, user} = ctx;
    return {
      req: req
        ? {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            url: req.url,
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            method: req.method,
            // TODO request_id
          }
        : undefined,
      usr: user
        ? {
            id: user.id ? user.id.toString() : user.username,
            username: user.username,
          }
        : undefined,
    };
  },
  level: 'info',
  prettyPrint: NODE_ENV !== 'production',
});
export function createLogger(service: string) {
  return rootLogger.child(service);
}
