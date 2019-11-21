import * as koa from "koa"
import * as Crypto from "crypto"
import { ContextWithSession } from "./interface"
import User from "../service/User"

export const login = async (ctx: ContextWithSession, next: koa.Next) => {
  if (ctx.url === "/login") {
    const userName = ctx.request.body.userName
    const passWord = Crypto.createHash("md5")
      .update(ctx.request.body.passWord)
      .digest("hex")

    try {
      const findOne = await User.getOneUserByUserName({ userName })

      ctx.response.status = 200
      if (findOne !== null) {
        const finPassWord = findOne.get("passWord")
        if (finPassWord === passWord) {
          ctx.session = {
            count: 0,
            isLogin: true,
            userName: userName,
            userId: findOne.get("userId")
          }

          ctx.body = {
            success: true,
            message: "登录成功"
          }
        } else {
          ctx.body = {
            success: false,
            message: "密码错误"
          }
        }
      } else {
        ctx.body = {
          success: false,
          message: "该用户名不存在"
        }
      }
    } catch (e) {
      ctx.response.status = 500
      ctx.body = {
        success: false,
        message: "登录失败, " + e
      }
    }
  }

  await next()
}
