const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    port: config.port,
    //logging: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connecting');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.wallet = require("./wallet.model.js")(sequelize, Sequelize);

module.exports = db;