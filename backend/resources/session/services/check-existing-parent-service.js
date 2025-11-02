const { logInfo } = require('lib/functional/logger');
const db = require('db/repository');
const uuid = require('uuid');
const Result = require('folktale/result');
const { whenResult, composeResult } = require('lib');
const GetGuardianByEmailPhoneQuery = require('resources/session/queries/get-guardian-by-email-or-phone-query.js');
const CreateStudentQuery = require('resources/session/queries/post-create-child-query.js');

module.exports.getGuardian = async (email,phone) => {
    logInfo('Check existing parent account', {email,phone});

    const createParentQueryResult = await db.execute(new GetGuardianByEmailPhoneQuery(email,phone));
    return await whenResult(result => result)(createParentQueryResult)
};
