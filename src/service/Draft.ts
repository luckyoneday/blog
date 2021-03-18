import { Draft } from "../models/Draft"

export default class {
  public static createDraft(data: {
    title: string
    content: string
    userName: string
    userId: number
    draftHash: string
    articleHash?: string
  }) {
    return Draft.create({
      draftHash: data.draftHash,
      articleHash: data.articleHash,
      userName: data.userName,
      userId: data.userId,
      title: data.title,
      content: data.content,
      isDelete: "0"
    }).catch(e => {
      console.log(e)
    })
  }

  public static updateDraft(data: {
    draftHash: string
    articleHash?: string
    title: string
    content: string
    isDelete: string
  }) {
    return Draft.update(
      {
        title: data.title,
        content: data.content,
        isDelete: data.isDelete,
        articleHash: data.articleHash
      },
      {
        where: { draftHash: data.draftHash }
      }
    ).catch(e => {
      console.log(e)
    })
  }

  public static deleteDraft(data: { draftHash: string }) {
    return Draft.destroy({
      where: {
        draftHash: data.draftHash
      }
    }).catch(e => {
      console.log(e)
    })
  }

  public static getAllDraftByUserName(data: { userName: string }) {
    return Draft.findAll({
      where: {
        userName: data.userName,
        isDelete: "0"
      }
    }).catch(e => {
      console.log(e)
    })
  }

  public static getDetailByArticleHash(data: { articleHash: string }) {
    return Draft.findOne({
      where: {
        articleHash: data.articleHash
      }
    }).catch(e => {
      console.log(e)
    })
  }

  public static getDetailByDraftHash(data: { draftHash: string }) {
    return Draft.findOne({
      where: {
        draftHash: data.draftHash
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
