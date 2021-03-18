import { Model, DataTypes } from "sequelize"
import sequelize from "./index"

export class Article extends Model {}

Article.init(
  {
    articleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      comment: '文章Id，唯一标识'
    },
    articleHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: '文章hash，唯一标识'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户唯一id'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户唯一用户名'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '文章标题'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '文章内容'
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '文章封面图'
    },
    visibleStatus: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      comment: '文章可见性'
    },
    isDelete: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      comment: '文章是否被删除'
    }
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: "article"
  }
)

Article.sync({ alter: true }).then(() => console.log("文章表连接成功"))
