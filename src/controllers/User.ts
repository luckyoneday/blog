import * as Router from "koa-router"
import * as Crypto from "crypto"
import { successMsg, unAuthorizedMsg, paramErrorMsg, sqlErrorMsg } from "../config/error"
import { checkMustParams } from "../utils/params"
import User from "../service/User"

export default class UserController {
  public static _hasUsedName = async (userName: string) => {
    try {
      const findOne = await User.getOneUserByUserName({ userName })
      return findOne || null
    } catch (e) {
      console.log("查询失败", e)
      return null
    }
  }

  public static signUp = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["userName", "passWord"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }

    const userName = ctx.request.body.userName
    const passWord = Crypto.createHash("md5").update(ctx.request.body.passWord).digest("hex")

    try {
      const findOne = await UserController._hasUsedName(userName)
      if (findOne !== null) {
        paramErrorMsg(ctx, "该用户名已存在")
      } else {
        const createData = { userName, passWord }
        try {
          const create = await User.createUser(createData)
          if (create) {
            successMsg(ctx)
          }
        } catch (e) {
          sqlErrorMsg(ctx, "创建失败, " + e)
        }
      }
    } catch (e) {
      sqlErrorMsg(ctx, "创建失败, " + e)
    }
  }

  public static login = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["userName", "passWord"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }

    const userName = ctx.request.body.userName
    const passWord = Crypto.createHash("md5").update(ctx.request.body.passWord).digest("hex")

    try {
      const findOne = await UserController._hasUsedName(userName)

      if (findOne !== null) {
        const finPassWord = findOne.get("passWord")
        if (finPassWord === passWord) {
          ctx.session = {
            count: 0,
            isLogin: true,
            userName: userName,
            userId: findOne.get("userId")
          }

          successMsg(ctx, undefined, "登录成功")
        } else {
          paramErrorMsg(ctx, "密码错误")
        }
      } else {
        paramErrorMsg(ctx, "该用户名不存在")
      }
    } catch (e) {
      sqlErrorMsg(ctx, "登录失败" + e)
    }
  }

  public static logout = async (ctx: Router.RouterContext) => {
    if (ctx.session && ctx.session.isLogin) {
      ctx.session = null
      successMsg(ctx)
    }
  }

  public static getUserInfo = async (ctx: Router.RouterContext) => {
    const session = ctx.session || {}
    if (session.isLogin) {
      successMsg(ctx, { userName: session.userName })
    } else {
      unAuthorizedMsg(ctx)
    }
  }

  public static verifyLogin = async (ctx: Router.RouterContext) => {
    const session = ctx.session || {}
    if (session.isLogin) {
      successMsg(ctx)
    } else {
      unAuthorizedMsg(ctx)
    }
  }
}
