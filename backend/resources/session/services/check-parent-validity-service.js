const { logInfo } = require('lib/functional/logger');
const db = require('db/repository');
const ValidationError = require('lib/validation-error');
const Result = require('folktale/result');
const { whenResult, composeResult } = require('lib');
const CreateParentAccountQuery = require('resources/session/queries/post-create-parent-account-query.js');
const PostCreateChildQuery = require('resources/session/queries/post-create-child-query.js');
const {getGuardian} = require('resources/session/services/check-existing-parent-service.js');


module.exports.perform = async (email) => {
    logInfo('Create parent account service', email);

    const response = Result.Ok("test");

    return response;
};
