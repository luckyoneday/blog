import { Article } from '../models/Article'

export default class {
  public static async createArticle(data: { title: string; content: string; userId: number, userName: string, cover: string, isPublic: string, articleHash: string }) {
    return await Article.create({
      articleHash: data.articleHash,
      userId: data.userId,
      userName: data.userName,
      title: data.title,
      content: data.content,
      cover: data.cover,
      isPublic: data.isPublic,
      isDelete: '0'
    })
  }

  public static async updateArticle(data: { articleHash: string, title: string; content: string; cover: string; isDelete: string, isPublic: string }) {
    return await Article.update({
      title: data.title,
      content: data.content,
      cover: data.cover,
      isPublic: data.isPublic,
      isDelete: data.isDelete
    }, {
      where: { articleHash: data.articleHash}
    })
  }

  public static async getAllArticle() {
    return await Article.findOne({
      where: {
        isPublic: '1',
        isDelete: '0'
      }
    })
  }

  public static async getAllArticleByUserId(data: { userId: string }) {
    return await Article.findOne({
      where: {
        userId: data.userId,
        isDelete: '0'
      }
    })
  }

  public static async getArticleDetailByArticleHash(data: { ArticleHash: string }) {
    return await Article.findOne({
      where: {
        ArticleHash: data.ArticleHash,
      }
    })
  }

}
