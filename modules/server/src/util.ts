import {Request} from 'express';
import {SpanOptions} from 'opentracing';
import {Context} from './Context';
import tracer from './tracer';

export const startSpan = (name: string, options?: SpanOptions) =>
  tracer.startSpan(name, options);

export function createContext(req: Request): Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let span = (req as any).span;

  if (span == null) {
    span = tracer.startSpan('UNKNOWN');
  }

  return {
    span,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    user: req.user,
    req,
    startSpan,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createWebSocketContext(user: any): Context {
  const span = tracer.startSpan('websocket');

  return {
    span,
    user,
    startSpan,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createCommandContext(name: string, user: any): Context {
  const span = tracer.startSpan(name);

  return {
    span,
    user,
    startSpan,
  };
}

export function createSystemContext(): Context {
  const span = tracer.startSpan('system');

  return {
    span,
    startSpan,
  };
}

export function isIterable(obj: any): boolean {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}
