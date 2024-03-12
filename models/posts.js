const { DataTypes } = require("sequelize");

const { sequelize } = require("../db/db");

sequelize.define('posts_table', {
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
  }
})