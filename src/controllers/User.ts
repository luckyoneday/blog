import * as Router from "koa-router"
import * as Crypto from "crypto"
import User from "../service/User"

export default class UserController {
  private static _hasUsedName = async (userName: string) => {
    try {
      const findOne = await User.getOneUserByUserName({ userName })
      return findOne || null
    } catch (e) {
      console.log("查询失败", e)
      return null
    }
  }

  public static signUp = async (ctx: Router.RouterContext) => {
    const userName = ctx.request.body.userName
    const passWord = Crypto.createHash("md5")
      .update(ctx.request.body.passWord)
      .digest("hex")

    try {
      const findOne = await UserController._hasUsedName(userName)
      if (findOne !== null) {
        ctx.response.status = 200
        ctx.body = {
          success: false,
          message: "该用户名已存在"
        }
      } else {
        const createData = { userName, passWord }
        try {
          const create = await User.createUser(createData)
          if (create) {
            ctx.response.status = 200
            ctx.body = {
              success: true,
              message: "创建成功"
            }
          }
        } catch (e) {
          ctx.response.status = 500
          ctx.body = {
            success: false,
            message: "创建失败, " + e
          }
        }
      }
    } catch (e) {
      ctx.response.status = 500
      ctx.body = {
        success: false,
        message: "创建失败, " + e
      }
    }
  }

  public static login = async (ctx: Router.RouterContext) => {
    const userName = ctx.request.body.userName
    const passWord = Crypto.createHash("md5")
      .update(ctx.request.body.passWord)
      .digest("hex")

    try {
      const findOne = await UserController._hasUsedName(userName)

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

  public static logout = async (ctx: Router.RouterContext) => {
    ctx.response.status = 200
    if (ctx.session && ctx.session.isLogin) {
      ctx.session = null
      ctx.body = {
        success: true,
        message: "退出登录成功"
      }
    }
  }

  public static getUserInfo = async (ctx: Router.RouterContext) => {
    const session = ctx.session || {}
    if (session.userName) {
      ctx.response.status = 200
      ctx.body = {
        success: true,
        data: session,
        message: "success"
      }
    } else {
      ctx.response.status = 401
      ctx.body = {
        success: false,
        code: 511,
        message: "清先登录"
      }
    }
  }
}
