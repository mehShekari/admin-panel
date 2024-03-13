const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const PostsModel = require('./posts');

const UserModel = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.CHAR,
    unique: true,
    allowNull: false
  },
  fullName: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  email: {
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false,
    validate: {
      len: [4, 245]
    }
  }
})

UserModel.hasMany(PostsModel, {
  foreignKey: 'userId',
  constraints: true
})

PostsModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  constraints: true
})

module.exports = UserModel