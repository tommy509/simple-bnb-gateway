require('dotenv').config({path:'../../.env'});
module.exports = {
    HOST:  process.env.DB_HOST,
    USER:  process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }; 