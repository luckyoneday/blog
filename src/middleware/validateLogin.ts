import * as koa from "koa"
import { unAuthorizedMsg } from "../config/error"

const excludesUrl = ["/login", "/signUp", "/article/allList", "/article/detail"]

export const validateLogin = async (ctx: koa.Context, next: any) => {
  // 不需要验证登录的接口排除掉
  const filtered = excludesUrl.filter(t => ctx.url.startsWith(t))
  if (filtered.length > 0) {
    return await next()
  }
  if (!(ctx.session && ctx.session.isLogin)) {
    return unAuthorizedMsg(ctx as any)
  }

}
