const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const TokenModel = sequelize.define("token_table", {
  token: {
    type: DataTypes.CHAR
  }
})

module.exports = TokenModel