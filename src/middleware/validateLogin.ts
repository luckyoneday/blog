
import * as koa from 'koa'
import { ContextWithSession } from './interface'

const excludesSet = new Set(['/login', '/signUp'])
export const validateLogin = async (ctx: ContextWithSession, next: koa.Next) => {

  // 不需要验证登录的两个接口排除掉
  if (!excludesSet.has(ctx.url)) {

    if (!(ctx.session && ctx.session.isLogin)) {

      ctx.response.status = 200
      ctx.body = {
        code: 511,
        success: false,
        message: '请先登录'
      }
      return
    }
  }

  await next()
}
