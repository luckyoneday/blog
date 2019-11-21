import * as koa from "koa"
import { ContextWithSession } from "./interface"

export const logout = async (ctx: ContextWithSession, next: koa.Next) => {
  if (ctx.url === "/logout") {
    ctx.response.status = 200
    if (ctx.session && ctx.session.isLogin) {
      ctx.session = null
      ctx.body = {
        success: true,
        message: "退出登录成功"
      }
    }
  }
  await next()
}
