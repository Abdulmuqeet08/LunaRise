const { logInfo } = require('lib/functional/logger');
const db = require('db/repository');
const ValidationError = require('lib/validation-error');
const Result = require('folktale/result');
const { whenResult, composeResult } = require('lib');
const CreateParentAccountQuery = require('resources/session/queries/post-create-parent-account-query.js');
const PostCreateChildQuery = require('resources/session/queries/post-create-child-query.js');
const {getGuardian} = require('resources/session/services/check-existing-parent-service.js');
module.exports.perform = async (data) => {
    logInfo('Create parent account service', data);
    const {name, email, phone, loginName, child} = data;
    const parentInfo = { name, email, phone, loginName };
    const studentInfo = { ...child };

    const response = await composeResult(
        async (guardianId) => {
            const childRecord = await db.execute(new PostCreateChildQuery(studentInfo, guardianId));
            const childDataSaved = await whenResult(
                result => result
            )(childRecord);

            return Result.Ok(childDataSaved);
        },
        async () => {
            const existingParent = await getGuardian(parentInfo.email, parentInfo.phone);
            if(!existingParent) {
                const createParentQueryResult = await db.execute(new CreateParentAccountQuery(parentInfo));
                return await whenResult(result => {
                    return Result.Ok(result && result.dataValues && result.dataValues.id)})(createParentQueryResult)
            } 
            return Result.Error(new ValidationError(0, ['parent already exists'])) 
        },
    )();

    return response;
};
