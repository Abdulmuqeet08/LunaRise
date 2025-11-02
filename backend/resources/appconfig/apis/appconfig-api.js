const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const UpsertAppConfigQuery = require('resources/appconfig/queries/upsert-appconfig-query.js'); // You can create a query or use direct model calls.



async function post(req) {
  console.log('Request to create or update AppConfig', req.body);

  // Constructing the response by composing the result of the database operation
  const response = await composeResult(() =>
    db.execute(new UpsertAppConfigQuery(req.body)) // Use your AppConfig model or query here
  )();

  return respond(response, 'Query Successful', 'Query Failed!');
}




// Define the route for AppConfig API call
Route.withOutSecurity().noAuth().post('/appconfig/upsert', post).bind();

module.exports.post = post;