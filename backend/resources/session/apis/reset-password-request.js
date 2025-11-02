const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const ResetPasswordRequestQuery = require('resources/session/queries/reset-password-request-query.js');


async function post(req) {
 console.log('Request to send reset password request ',req.body)
  const response = await composeResult(() =>
        db.execute(new ResetPasswordRequestQuery(req.body))
    )();
console.log("reset response:",response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withOutSecurity().noAuth().post('/session/resetPasswordRequest', post).bind();

module.exports.post = post;