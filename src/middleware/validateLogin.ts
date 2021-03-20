import * as koa from "koa"
import { unAuthorizedMsg } from '../config/error'


const excludesSet = new Set(["/login", "/signUp", "/article/allList"])

export const validateLogin = async (ctx: koa.Context, next: any) => {
  // 不需要验证登录的两个接口排除掉
  if (!excludesSet.has(ctx.url)) {
    if (!(ctx.session && ctx.session.isLogin)) {
      return unAuthorizedMsg(ctx as any)
    }
  }

  await next()
}
