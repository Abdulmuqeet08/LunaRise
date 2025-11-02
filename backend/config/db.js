const Sequelize = require('sequelize');
const db = {};
// Sequelize parameters separately

const sequelize = new Sequelize(

  process.env.DB_INSTANCE,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    logging: false,//false //true
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    dialectOptions: {
      requestTimeout: 300000,
      options: {
        requestTimeout: 300000,
        encrypt: false,
        enableArithAbort: false
      }
    },



    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true
    }
  });

db.sequelize = sequelize;
db.Sequelize = sequelize;
module.exports = db;
