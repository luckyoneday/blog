import { Model, DataTypes } from "sequelize"
import sequelize from "./index"

export class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      comment: '用户唯一id'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户唯一用户名'
    },
    passWord: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户密码'
    }
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: "users"
  }
)

User.sync()
