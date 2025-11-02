const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { whenResult, respond, composeResult } = require('lib');
const ValidationError = require('lib/validation-error');

const token = require('lib/token');
const R = require('ramda');
const Result = require('folktale/result');

const GetAcAdminForLoginQuery = require('resources/session/queries/get-ac-admin-for-login-query');
const db = require('db/repository');

const md5 = require('md5');

const generateToken = async (result) => {
    const generatedTokenResult = await token.generate({
        id: result.es_user_es_hr_id,
        loginName: result.es_user_login_name,
        name: result.es_user_full_name,
        roles: ['Admin'],
        status: result.es_user_status,
        type: result.es_user_type
    });

    return whenResult(generatedToken => Result.Ok({
        id: result.es_user_es_hr_id,
        loginName: result.es_user_login_name,
        name: result.es_user_full_name,
        roles: ['Admin'],
        status: result.es_user_status,
        type: result.es_user_type,
        token: generatedToken
    }))(generatedTokenResult);
};

const verifyPassword = R.curry((dbPassword, givenPassword) => {
    console.log("🚀 ~ file: ac-admin-login-api.js ~ line 37 ~ verifyPassword ~ givenPassword", md5(givenPassword), "----", dbPassword.es_user_login_password, "----", md5(givenPassword) == dbPassword.es_user_login_password)

    if (!givenPassword) return false;
    return md5(givenPassword) == dbPassword.es_user_login_password;
});

async function post(req) {
    const { email, password } = req.body;

    logInfo('Request for admin login', { email, password });
    console.log("🚀 ~ file: ac-admin-login-api.js ~ line 47 ~ post ~ email, password", email, password)

    const response = await composeResult(
        result => R.ifElse(
            () => verifyPassword(result, password),
            () => generateToken(result),
            () => Result.Error(
                new ValidationError(0, 'Enter valid email and Password!')
            )
        )(result),
        () => db.findOne_login(new GetAcAdminForLoginQuery(email, password))
    )();
    return respond(response, 'Successfully verified !', 'Failed to verify!');
}
Route.withOutSecurity()
    .noAuth()
    .post('/identity/session/ac-admin-login', post)
    .bind();

module.exports.post = post;
