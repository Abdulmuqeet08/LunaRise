const Route = require("route");
const { whenResult, respond, composeResult } = require("lib");

const token = require("lib/token");
const R = require("ramda");
const Result = require("folktale/result");

const db = require("db/repository");

const GetUsersRolesQuery = require("../queries/get-users-roles-query");

const { result } = require("lodash");
const { response } = require("express");


async function getRoles(req) {
    // console.log("Request to fetch user roles")
    const response = await composeResult(() =>
        db.execute(new GetUsersRolesQuery())
    )();
    return respond(response, "Successfully Changed !", "Failed to Changed!");
}







Route.withSecurity().noAuth().get("/getroles", getRoles).bind();


