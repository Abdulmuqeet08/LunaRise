const Route = require('route');
const { respond, composeResult } = require('lib');
const db = require('db/repository');

// Queries
const InsertCycleQuery = require('../queries/InsertCycleQuery');
const GetUserCycleData = require('../queries/get_user_data');  // Path to your GetUserCycleData query

// Insert cycle data
async function insertCycle(req) {
    try {
        console.log('Request to insert cycle data:', req.body);

        const response = await composeResult(
            () => db.execute(new InsertCycleQuery(req.body))
        )();

        return respond(response, 'Cycle data saved successfully!', 'Failed to save cycle data!');
    } catch (error) {
        console.error("Error in insertCycle route:", error);
        return {
            statusCode: 500,
            body: {
                success: false,
                message: 'Internal server error',
                error: error.message
            }
        };
    }
}

// Get user cycle data
async function getUserCycleData(req) {
    if (!req.body.UserID) {
        return respond(null, null, 'UserID is required', 400);
    }

    try {
        // Use the GetUserCycleData query to fetch data
        const response = await composeResult(() =>
            db.execute(new GetUserCycleData(req.body))
        )();

        return respond(response, 'Cycle data retrieved successfully', 'Failed to fetch cycle data');
    } catch (error) {
        console.error("Error fetching cycle data:", error);
        return respond(null, null, 'Internal Server Error', 500);
    }
}

// Define Routes
Route.withOutSecurity().noAuth().post('/cycle/insert', insertCycle).bind();
Route.withOutSecurity().noAuth().post('/cycle/data', getUserCycleData).bind();

module.exports = { insertCycle, getUserCycleData };
