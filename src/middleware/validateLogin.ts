import * as koa from "koa"
import { HTTP_STATUS_CODE,NORMAL_STATUS_CODE } from '../config/code'


const excludesSet = new Set(["/login", "/signUp"])
export const validateLogin = async (ctx: koa.Context, next: any) => {
  // 不需要验证登录的两个接口排除掉
  if (!excludesSet.has(ctx.url)) {
    if (!(ctx.session && ctx.session.isLogin)) {
      ctx.response.status = HTTP_STATUS_CODE.OK
      ctx.body = {
        code: NORMAL_STATUS_CODE.UNAUTHORIZED,
        success: false,
        message: "请先登录"
      }
      return
    }
  }

  await next()
}
