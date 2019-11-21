import * as koa from "koa"

export interface ContextWithSession extends koa.Context {
  session: any
}
