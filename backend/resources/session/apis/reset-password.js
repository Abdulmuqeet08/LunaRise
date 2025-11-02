const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const ResetPasswordQuery = require('resources/session/queries/reset-password-query.js');


async function post(req) {
 console.log('Request to reset password ',req.body)
  const response = await composeResult(() =>
        db.execute(new ResetPasswordQuery(req.body))
    )();
// console.log(response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withOutSecurity().noAuth().post('/session/resetPassword', post).bind();

module.exports.post = post;