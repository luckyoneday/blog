import * as Router from "koa-router"
import { v4 } from "uuid"
import { sqlErrorMsg, successMsg, paramErrorMsg } from "../config/error"
import { checkMustParams } from "../utils/params"
import Draft from "../service/Draft"

export default class DraftController {
  public static createDraft = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["title", "content"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }

    const session = ctx.session || {}
    const { userName, userId } = session
    const { title, content, articleHash = null } = ctx.request.body
    let draftHash = ""

    try {
      if (articleHash) {
        const findOne = await Draft.getDetailByArticleHash({ articleHash })
        if (findOne && findOne.get("isDelete") === "0") {
          draftHash = findOne.get("draftHash") as string
          console.log(draftHash, "000000-----")

          await Draft.updateDraft({
            draftHash,
            articleHash,
            title: findOne.get("title") as string,
            content: findOne.get("content") as string,
            isDelete: "0"
          })
          return successMsg(ctx, { draftHash })
        } else draftHash = v4()
      } else draftHash = v4()

      await Draft.createDraft({ userName, userId, title, content, draftHash, articleHash })
      successMsg(ctx, { draftHash })
    } catch (e) {
      sqlErrorMsg(ctx, "创建草稿失败" + e)
    }
  }

  public static updateDraft = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["title", "content", "draftHash"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }
    const { title, content, draftHash, articleHash = null } = ctx.request.body

    try {
      const findOne = await Draft.getDetailByDraftHash({ draftHash })

      if (!(findOne && findOne.get("isDelete") === "0")) {
        return paramErrorMsg(ctx, "该草稿不存在")
      }

      await Draft.updateDraft({ title, content, draftHash, isDelete: "0", articleHash })
      successMsg(ctx, { draftHash })
    } catch (e) {
      sqlErrorMsg(ctx, "更新失败" + e)
    }
  }

  public static deleteDraft = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["draftHash"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }
    const { draftHash } = ctx.request.body

    try {
      const findOne = await Draft.getDetailByDraftHash({ draftHash })

      if (!(findOne && findOne.get("isDelete") === "0")) {
        return paramErrorMsg(ctx, "该草稿不存在")
      }

      await Draft.updateDraft({
        title: findOne.get("title") as string,
        content: findOne.get("content") as string,
        draftHash,
        isDelete: "1"
      })
      successMsg(ctx, { draftHash })
    } catch (e) {
      sqlErrorMsg(ctx, "删除失败" + e)
    }
  }

  public static getDraftList = async (ctx: Router.RouterContext) => {
    const session = ctx.session || {}
    const userName = session.userName

    try {
      const list = await Draft.getAllDraftByUserName({ userName })
      successMsg(ctx, { list })
    } catch (e) {
      sqlErrorMsg(ctx, "")
    }
  }

  public static getDraftDetail = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.query, ["draftHash"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }
    const { draftHash } = ctx.request.query

    try {
      const findOne = await Draft.getDetailByDraftHash({ draftHash })
      if (!(findOne && findOne.get("isDelete") === "0")) {
        return paramErrorMsg(ctx, "该草稿不存在")
      }

      successMsg(ctx, findOne)
    } catch (e) {
      sqlErrorMsg(ctx, "")
    }
  }
}
