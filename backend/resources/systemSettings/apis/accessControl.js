const Route = require("route");
const db = require('db/repository');
const { sequelize } = require("models/index.js");
const { whenResult, respond, composeResult } = require("lib");
const token = require("lib/token");
const R = require("ramda");
const Result = require("folktale/result");
const TRAMenuItemQuery = require("../queries/get-menu-item-query")

const UpdateMenuLabelQuery = require("../queries/get-menu-title-query")
const UpdateMenuRoleLabelQuery = require("../queries/get-user-type-query")

const TRAMenuMasterQuery = require("../queries/put-menu-master-query")
const ToggleMenuMasterQuery = require("../queries/toggle-menu-master-query")

async function getMenuItemsList(req) {   
    const response = await composeResult(           
        () => db.execute(new TRAMenuItemQuery(req))
    )();
    return respond(response, "Successfully Fetchted !", "Failed to Fetch!");

}
async function putMenuItems(req) {
    console.log("Request to upsert menu item:",req.body)

 const response = await composeResult(
        // () => db.execute(new UpdateMenuRoleLabelQuery(req.body)),//TRAUpdateUserRoleLabel
        () => db.execute(new UpdateMenuLabelQuery(req.body)),//TRAUpdateParentLabel
        () => db.execute(new TRAMenuMasterQuery(req.body))
    )();console.log("access controll",composeResult)

    return respond(response, "Successfully Updated !", "Failed to Update!");
}
async function toggleMenuItems(req) {   
    const response = await composeResult(
        () => db.execute(new ToggleMenuMasterQuery(req.body))
    )();
    console.log("----Delete method----",req.body)
    return respond(response, "Successfully Deleted !", "Failed to Delete!");
}


Route.withOutSecurity().noAuth().get("/getmenulist", getMenuItemsList).bind();
Route.withSecurity().noAuth().put("/putmenuItems", putMenuItems).bind();
Route.withOutSecurity().noAuth().post("/toggleMenuItem", toggleMenuItems).bind();