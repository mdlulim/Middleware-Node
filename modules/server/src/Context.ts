import {Span, SpanOptions} from 'opentracing';
import {Request} from 'express';

export interface BaseContext {
  span: Span;
  req?: Request;

  // TODO anonymous user?
  user?: {id: number; username: string};
  startSpan(name: string, options?: SpanOptions): Span;
}

export type Context = BaseContext;
