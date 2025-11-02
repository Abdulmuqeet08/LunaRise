const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const GetPasswordRequestQuery = require('resources/session/queries/get-password-request-query.js');


async function post(req) {
//  console.log('Request to get password request ',req.body)
  const response = await composeResult(() =>
        db.execute(new GetPasswordRequestQuery(req.body))
    )();
// console.log(response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withOutSecurity().noAuth().post('/session/getPasswordResetRequests', post).bind();

module.exports.post = post;