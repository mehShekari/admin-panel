const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const PostsModel = sequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.CHAR(150),
    allowNull: false,
    validate: {
      len: [4, 150]
    }
  },
  description: {
    type: DataTypes.CHAR(),
    validate: {
      len: [4, 255]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
})

module.exports = PostsModel;