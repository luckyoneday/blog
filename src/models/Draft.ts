import { Model, DataTypes } from "sequelize"
import sequelize from "./index"

export class Draft extends Model {}

Draft.init(
  {
    draftId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      comment: "草稿Id，唯一标识"
    },
    draftHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: "草稿hash，唯一标识"
    },
    articleHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      comment: "文章hash，唯一标识"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户唯一id"
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "用户唯一用户名"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "草稿的标题"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "草稿的内容"
    },
    isDelete: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      allowNull: false,
      comment: "草稿是否被删除"
    }
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: "draft"
  }
)

Draft.sync({ alter: true }).then(() => console.log("草稿表连接成功"))
