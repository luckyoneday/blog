import { User } from '../models/User'

export default class {
  public static async createUser(data: { userName: string; passWord: string }) {
    return await User.create({
      userName: data.userName,
      passWord: data.passWord
    })
  }

  public static async getAllUser() {
    return await User.findAll()
  }

  public static async getOneUserByUserName(data: { userName: string }) {
    return await User.findOne({
      where: {
        userName: data.userName
      }
    })
  }
}
