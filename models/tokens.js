const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const TokenModel = sequelize.define("tokens", {
  token: {
    type: DataTypes.CHAR
  }
})

module.exports = TokenModel