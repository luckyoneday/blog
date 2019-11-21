import { Sequelize } from "sequelize"
import { sqlConfig } from "../config"

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: "mysql",
  port: sqlConfig.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

export default sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log("连接数据库成功！")
  })
  .catch(err => {
    console.log("连接数据库失败！失败原因： ", err)
  })
