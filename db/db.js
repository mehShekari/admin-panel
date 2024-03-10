const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  database: "paneladmin_db",
  username: "root",
  password: "primus1380",
  host: "localhost",
  dialect: "mysql"
})

const connectDb = (app) => {
  return new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then(() => {
        sequelize.sync()
          .then(resolve);
      })
      .catch(reject)
  })
}

module.exports = { connectDb, sequelize };