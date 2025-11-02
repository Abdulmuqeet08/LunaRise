const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const UpsertSignupQuery = require('resources/session/queries/upsert-signup-query.js');


async function post(req) {
//  console.log('Request to signup ',req.body)
  const response = await composeResult(() =>
        db.execute(new UpsertSignupQuery(req.body))
    )();
  // console.log(response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withOutSecurity().noAuth().post('/session/signup', post).bind();

module.exports.post = post;