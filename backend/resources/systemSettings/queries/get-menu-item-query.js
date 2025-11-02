const Models = require("models");
const { sequelize } = require("models/index.js");
const { Op, literal } = require('sequelize');




module.exports = class p4uMenuItemQuery {
  constructor() {
    
  }



  async get() {
    return await Models.p4u_MenuMaster.findAll({
      logging:console.log,      
      
    
    })
}
}