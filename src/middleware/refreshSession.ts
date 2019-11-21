import * as koa from "koa"

const excludesSet = new Set(["/logout", "/signUp"])
export const refreshSession = async (ctx: koa.Context, next: any) => {
  // 不需要刷新token的两个接口排除掉
  if (!excludesSet.has(ctx.url)) {
    if (ctx.session && ctx.session.isLogin) {
      ctx.session.count++
    }
    await next()
  } else {
    ctx.response.status = 401
    ctx.body = {
      code: 511,
      success: false,
      message: "请先登录"
    }
  }
  return
}
