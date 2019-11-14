import { Context } from 'koa'
import User from '../service/User'

export default class UserController {

  private static _hasUsedName = async (ctx: Context) => {
    const userName = ctx.request.body.userName

    try {
      const findOne = await User.getOneUserByUserName({ userName })
      if (findOne) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('查询失败', e)
      return false
    }
  }

  public static createUser = async (ctx: Context) => {
    const userName = ctx.request.body.userName
    const passWord = ctx.request.body.passWord

    try {
      const hasOne = await UserController._hasUsedName(ctx)
      if (hasOne) {
        ctx.response.status = 200
        ctx.body = {
          success: false,
          message: '该用户名已存在'
        }
      } else {
        const createData = { userName, passWord }
        try {
          const create = await User.createUser(createData)
          if (create) {
            ctx.response.status = 200
            ctx.body = {
              success: true,
              message: '创建成功'
            }
          }
        } catch (e) {
          ctx.response.status = 500
          ctx.body = {
            success: false,
            message: '创建失败, ' + e
          }
        }
      }
    } catch (e) {
      ctx.response.status = 500
      ctx.body = {
        success: false,
        message: '创建失败, ' + e
      }
    }
  }

  public static validatePassword = async (ctx: Context) => {
    const userName = ctx.request.body.userName
    const passWord = ctx.request.body.passWord

    try {
      const hasOne = await UserController._hasUsedName(ctx)
      ctx.response.status = 200
      if (hasOne) {
        const findOne = await User.getOneUserByUserName({ userName })
        console.log(findOne)
        const finPassWord = findOne && findOne.get('passWord')
        if (finPassWord === passWord) {
          ctx.body = {
            success: true,
            message: '登录成功'
          }
        }
      } else {
        ctx.body = {
          success: false,
          message: '该用户名不存在'
        }
      }
    } catch (e) {
      ctx.response.status = 500
      ctx.body = {
        success: false,
        message: '创建失败, ' + e
      }
    }
  }
}