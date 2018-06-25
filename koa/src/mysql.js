import Sequelize from 'sequelize'
import mysql from './db/config'

export const User = mysql.define('user', {
  _id: {
    field: 'id',
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  account: Sequelize.STRING(18),
  password: Sequelize.STRING(18),
  name: Sequelize.STRING(45),
  age: Sequelize.INTEGER(3),
  sex: Sequelize.STRING(45),
  iphone: Sequelize.STRING(45),
  email: Sequelize.STRING(45),
  address: Sequelize.STRING(200),
  createDate: Sequelize.DATE,
  state: Sequelize.TINYINT(1)
}, {
  timestamps: false,
  freezeTableName: true
});
