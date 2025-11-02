const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const VerifyUserName = require('resources/session/queries/get-user-details-query.js');


async function post(req) {
  const username=req.body.entity;
//  console.log('Request to verify availability of a username',username)
  const response = await composeResult(() =>
        db.execute(new VerifyUserName(username))
    )();
// console.log(response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withOutSecurity().noAuth().post('/verifyUsername', post).bind();

module.exports.post = post;