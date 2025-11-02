
const Route = require("route");
const db = require('db/repository');
const { sequelize } = require("models/index.js");
const { whenResult, respond, composeResult } = require("lib");
const token = require("lib/token");
const R = require("ramda");
const Result = require("folktale/result");
const P4UMenuMasterQuery = require("../queries/get-menu-master-query");
const P4UChildMenuMasterQuery = require("../queries/get-child-menu-master-query");

async function getChildMenuItems(menuid, roleId) {
  const response = await composeResult(
    () => db.execute(new P4UChildMenuMasterQuery(menuid, roleId))
  )();
  return respond(response, "Successfully Fetched Child Items !", "Failed to Fetch Child Items!");
};

async function getMenuItems(req, res) {
  // console.log("Request to render user role wise menu:", req.body)
  let roleId = req.body.UserRole
  const response = await composeResult(
    async (menuResults) => {
      // console.log("-------menu results--------",menuResults)
      //iterate through all main menu items to check if child items exist
      for (let i = 0; i < menuResults.length; i++) {
        let parentId = menuResults[i].dataValues.id;
        const groupItems = await getChildMenuItems(parentId, roleId);
        // console.log("-----groupItems response-----",groupItems.value.entity)
        menuResults[i].dataValues.type = 'basic';
        menuResults[i].dataValues.id = String(menuResults[i].dataValues.id);
        //iterate through all child items if any for group
        if (groupItems.value.entity.length > 0) {
          menuResults[i].dataValues.type = 'group';
          if (groupItems.value.entity.length > 0) {
            for (let j = 0; j < groupItems.value.entity.length; j++) {
              let parentId1 = groupItems.value.entity[j].dataValues.id;
              groupItems.value.entity[j].dataValues.id = String(groupItems.value.entity[j].dataValues.id);
              const collapsibleItems = await getChildMenuItems(parentId1, roleId);
              //iterate through all child items if any for collapsable
              if (collapsibleItems.value.entity.length > 0) {
                // collapsibleItems.value.entity.dataValues.id=String(collapsibleItems.value.entity.dataValues.id);
                if (groupItems.value.entity[j].dataValues.link == null)
                  delete groupItems.value.entity[j].dataValues.link;
                groupItems.value.entity[j].dataValues.type = 'collapsable';
                groupItems.value.entity[j].dataValues['children'] = collapsibleItems.value.entity;
              }
            }
          }
          if (menuResults[i].dataValues.link == null)
            delete menuResults[i].dataValues.link;
          menuResults[i].dataValues['children'] = groupItems.value.entity;
        }
      }
      return Result.Ok(menuResults)
    },
    () => db.execute(new P4UMenuMasterQuery('main', '', roleId))
  )();
  return respond(response, "Successfully Fetched !", "Failed to Fetch!");
}
Route.withOutSecurity().noAuth().post("/getMenuItems", getMenuItems).bind();
