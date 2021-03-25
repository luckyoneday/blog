import * as koa from "koa"
import { unAuthorizedMsg } from '../config/error'

const excludesUrl = ["/api/logout", "/api/signUp", "/api/login", "/api/article/allList", "/api/article/detail"]

export const refreshSession = async (ctx: koa.Context, next: any) => {
  // 不需要刷新token的接口排除掉
  const filtered = excludesUrl.filter(t => ctx.url.startsWith(t))
  if (filtered.length > 0) {
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
