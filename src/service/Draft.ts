import { Draft } from "../models/Draft"

export default class {
  public static async createDraft(data: {
    title: string
    content: string
    userName: string
    userId: number
    draftHash: string
  }) {
    return await Draft.create({
      draftHash: data.draftHash,
      userName: data.userName,
      userId: data.userId,
      title: data.title,
      content: data.content,
      isDelete: "0",
      draftId: 1
    })
  }

  public static async updateDraft(data: {
    draftHash: string
    title: string
    content: string
    isDelete: string
  }) {
    return await Draft.update(
      {
        title: data.title,
        content: data.content,
        isDelete: data.isDelete
      },
      {
        where: { draftHash: data.draftHash }
      }
    )
  }

  public static async getAllDraftByUserName(data: { userName: string }) {
    return await Draft.findAll({
      where: {
        userName: data.userName,
        isDelete: "0"
      }
    })
  }

  public static async getDetailByDraftHash(data: { draftHash: string }) {
    return await Draft.findOne({
      where: {
        draftHash: data.draftHash
      }
    })
  }
}
