import * as Router from "koa-router"

// http 状态码
const enum HTTP_STATUS_CODE  {
  OK = 200,

  PARAM_ERROR = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,

  INTERNAL_ERROR = 500,
}

// 业务状态码 
const enum NORMAL_STATUS_CODE {
  SUCCESS = 10000,

  UNAUTHORIZED = 40001,
  PARAM_ERROR = 40011,
  API_NOT_FOUND = 40012,

  SQL_ERROR = 50001, 
}

// 成功的返回
export const successMsg = (ctx: Router.RouterContext, data?: any, message?: string) => {
  ctx.response.status = HTTP_STATUS_CODE.OK
  ctx.body = {
    code: NORMAL_STATUS_CODE.SUCCESS,
    success: true,
    message: message || 'success',
  }
  if (data) {
    ctx.body.data = data
  }
}

// 未登录访问
export const unAuthorizedMsg = (ctx: Router.RouterContext) => {
  ctx.response.status = HTTP_STATUS_CODE.OK,
  ctx.body = {
    code: NORMAL_STATUS_CODE.UNAUTHORIZED,
    success: false,
    message: "访客态访问"
  }
}

// 数据库访问失败
export const sqlErrorMsg = (ctx: Router.RouterContext, message?: string) => {
  ctx.response.status = HTTP_STATUS_CODE.INTERNAL_ERROR,
  ctx.body = {
    code: NORMAL_STATUS_CODE.SQL_ERROR,
    success: false,
    message: message || "param error"
  }
}

// 参数错误
export const paramErrorMsg = (ctx: Router.RouterContext, message?: string) => {
  ctx.response.status = HTTP_STATUS_CODE.PARAM_ERROR,
  ctx.body = {
    code: NORMAL_STATUS_CODE.PARAM_ERROR,
    success: false,
    message: message || "param error"
  }
}