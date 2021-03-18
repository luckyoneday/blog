import * as Router from "koa-router"
import { v4 } from "uuid"
import { sqlErrorMsg, successMsg, paramErrorMsg } from "../config/error"
import { checkMustParams } from "../utils/params"
import Article from "../service/Article"
import Draft from "../service/Draft"

export default class ArticleController {
  public static deleteDraft = async (ctx: Router.RouterContext, draftHash: string) => {
    if (!draftHash) return
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
    } catch (e) {
      sqlErrorMsg(ctx, "草稿转文章失败" + e)
    }
  }

  public static createArticle = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, [
      "title",
      "content",
      "visibleStatus",
      "cover",
      "draftHash"
    ])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }

    const session = ctx.session || {}
    const userName = session.userName
    const userId = session.userId
    const { title, content, cover, visibleStatus, draftHash = '' } = ctx.request.body

    try {
      await ArticleController.deleteDraft(ctx, draftHash)

      const articleHash = v4()
      await Article.createArticle({
        userName,
        userId,
        title,
        content,
        articleHash,
        cover,
        visibleStatus
      })
      successMsg(ctx, { articleHash })
    } catch (e) {
      sqlErrorMsg(ctx, "创建文章失败" + e)
    }
  }

  public static updateArticle = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["title", "content", "articleHash"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }
    const { title, content, articleHash, cover, visibleStatus, draftHash } = ctx.request.body

    try {
      await ArticleController.deleteDraft(ctx, draftHash)
      
      await Article.updateArticle({
        title,
        content,
        articleHash,
        isDelete: "0",
        cover,
        visibleStatus
      })
      successMsg(ctx, { articleHash })
    } catch (e) {
      sqlErrorMsg(ctx, "更新失败" + e)
    }
  }

  public static deleteArticle = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.body, ["ArticleHash"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }
    const { articleHash } = ctx.request.body

    try {
      const findOne = await Article.getDetailByArticleHash({ articleHash })

      if (!(findOne && findOne.get("isDelete") === "0")) {
        return paramErrorMsg(ctx, "该文章不存在")
      }

      await Article.updateArticle({
        title: findOne.get("title") as string,
        content: findOne.get("content") as string,
        articleHash,
        isDelete: "1",
        cover: findOne.get("cover") as string,
        visibleStatus: findOne.get("visibleStatus") as string
      })
      successMsg(ctx, { articleHash })
    } catch (e) {
      sqlErrorMsg(ctx, "删除失败" + e)
    }
  }

  public static getArticleList = async (ctx: Router.RouterContext) => {
    const session = ctx.session || {}
    const userName = session.userName

    try {
      const list = await Article.getAllArticleByUserName({ userName })
      successMsg(ctx, { list })
    } catch (e) {
      sqlErrorMsg(ctx, "")
    }
  }

  public static getArticleDetail = async (ctx: Router.RouterContext) => {
    const paramError = checkMustParams(ctx.request.query, ["articleHash"])
    if (paramError.length) {
      return paramErrorMsg(ctx, paramError)
    }
    const { articleHash } = ctx.request.query

    try {
      const findOne = await Article.getDetailByArticleHash({ articleHash })
      if (!(findOne && findOne.get("isDelete") === "0")) {
        return paramErrorMsg(ctx, "该文章不存在")
      }

      successMsg(ctx, findOne)
    } catch (e) {
      sqlErrorMsg(ctx, "")
    }
  }
}
