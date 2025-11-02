const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const ApprovePasswordRequestQuery = require('resources/session/queries/approve-reset-password-query.js');


async function post(req) {
 console.log('Request to approve reset password request ',req.body)
  const response = await composeResult(() =>
        db.execute(new ApprovePasswordRequestQuery(req.body.id_user))
    )();
// console.log(response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withSecurity().noAuth().post('/session/approvePasswordRequest', post).bind();

module.exports.post = post;