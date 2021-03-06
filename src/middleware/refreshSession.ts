import * as koa from "koa"
import { unAuthorizedMsg } from '../config/error'

const excludesSet = new Set(["/logout", "/signUp", "/login"])
export const refreshSession = async (ctx: koa.Context, next: any) => {
  // 不需要刷新token的接口排除掉
  if (excludesSet.has(ctx.url)) {
    return await next()
  } else {
    if (ctx.session && ctx.session.isLogin) {
      ctx.session.count++
      return await next()
    } else {
      unAuthorizedMsg(ctx as any)
      return
    }
  }
}
