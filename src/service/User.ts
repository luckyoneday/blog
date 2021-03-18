import { User } from "../models/User"

export default class {
  public static createUser(data: { userName: string; passWord: string }) {
    return User.create({
      userName: data.userName,
      passWord: data.passWord
    }).catch(e => {
      console.log(e)
    })
  }

  public static getAllUser() {
    return User.findAll().catch(e => {
      console.log(e)
    })
  }

  public static getOneUserByUserName(data: { userName: string }) {
    return User.findOne({
      where: {
        userName: data.userName
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
