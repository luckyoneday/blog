import { Model, DataTypes } from 'sequelize'
import sequelize from './index'

export class User extends Model { }

User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  freezeTableName: true,
  tableName: 'users'
})

User.sync()
