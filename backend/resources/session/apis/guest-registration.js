const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const UpsertGuestQuery = require('resources/session/queries/upsert-guest-query.js');


async function post(req) {
 console.log('Request to register a guestt ',req.body)
  const response = await composeResult(() =>
        db.execute(new UpsertGuestQuery(req.body))
    )();
// console.log(response)
  return respond(response, 'Query Successful', 'Query Failed!');
}
Route.withOutSecurity().noAuth().post('/session/guest-reg', post).bind();

module.exports.post = post;