import { Article } from "../models/Article"

export default class {
  public static createArticle(data: {
    title: string
    content: string
    userId: number
    userName: string
    cover: string
    visibleStatus: string
    articleHash: string
  }) {
    return Article.create({
      articleHash: data.articleHash,
      userId: data.userId,
      userName: data.userName,
      title: data.title,
      content: data.content,
      cover: data.cover,
      visibleStatus: data.visibleStatus,
      isDelete: "0"
    }).catch(e => {
      console.log(e)
    })
  }

  public static updateArticle(data: {
    articleHash: string
    title: string
    content: string
    cover: string
    isDelete: string
    visibleStatus: string
  }) {
    return Article.update(
      {
        title: data.title,
        content: data.content,
        cover: data.cover,
        visibleStatus: data.visibleStatus,
        isDelete: data.isDelete
      },
      {
        where: { articleHash: data.articleHash }
      }
    ).catch(e => {
      console.log(e)
    })
  }

  public static getAllArticle() {
    return Article.findAll({
      where: {
        visibleStatus: "1",
        isDelete: "0"
      }
    }).catch(e => {
      console.log(e)
    })
  }

  public static getAllArticleByUserName(data: { userName: string }) {
    return Article.findAll({
      where: {
        userName: data.userName,
        isDelete: "0"
      }
    }).catch(e => {
      console.log(e)
    })
  }

  public static getDetailByArticleHash(data: { articleHash: string }) {
    return Article.findOne({
      where: {
        articleHash: data.articleHash
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
