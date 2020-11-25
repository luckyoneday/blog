import * as koa from "koa"
import { HTTP_STATUS_CODE,NORMAL_STATUS_CODE } from '../config/code'

const excludesSet = new Set(["/logout", "/signUp", "/login"])
export const refreshSession = async (ctx: koa.Context, next: any) => {
  // 不需要刷新token的两个接口排除掉
  if (excludesSet.has(ctx.url)) {
    return await next()
  } else {
    if (ctx.session && ctx.session.isLogin) {
      ctx.session.count++
      return await next()
    } else {
      ctx.response.status = HTTP_STATUS_CODE.UNAUTHORIZED
      ctx.body = {
        code: NORMAL_STATUS_CODE.UNAUTHORIZED,
        success: false,
        message: "请先登录"
      }
      return
    }
  }
}
