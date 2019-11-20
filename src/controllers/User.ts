import { RouterContext } from 'koa-router'
import * as Crypto from 'crypto'
import User from '../service/User'

export default class UserController {

  private static _hasUsedName = async (userName: string) => {

    try {
      const findOne = await User.getOneUserByUserName({ userName })
      return findOne || null
    } catch (e) {
      console.log('查询失败', e)
      return null
    }
  }

  public static signUp = async (ctx: RouterContext) => {
    const userName = ctx.request.body.userName
    const passWord = Crypto.createHash('md5').update(ctx.request.body.passWord).digest('hex')

    try {
      const findOne = await UserController._hasUsedName(userName)
      if (findOne !== null) {
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


}