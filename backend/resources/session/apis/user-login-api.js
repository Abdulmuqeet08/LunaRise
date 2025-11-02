const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { whenResult, respond, composeResult } = require('lib');
const ValidationError = require('lib/validation-error');

const token = require('lib/token');
const R = require('ramda');
const Result = require('folktale/result');
const GetUserForLoginQuery = require('resources/session/queries/get-user-for-login-query');
const db = require('db/repository');
const PasswordHash = require('password-hash');
const md5 = require('md5');

const generateToken = async(result) => {
    const generatedTokenResult = await token.generate({
        id: result.es_user_es_hr_id,
        loginName: result.es_user_login_name,
        name: result.es_user_full_name,
        roles: [result.role],
        status: result.es_user_status,
        type: result.es_user_type
    });

    return whenResult(generatedToken => Result.Ok({
        id: result.es_user_es_hr_id,
        loginName: result.es_user_login_name,
        name: result.es_user_full_name,
        roles: [result.role],
        status: result.es_user_status,
        type: result.es_user_type,
        token: generatedToken
    }))(generatedTokenResult);
};

const verifyPassword = R.curry((dbPassword, givenPassword) => {
    if (!dbPassword) return false;
    return md5(givenPassword) == dbPassword.es_user_login_password;
});
const verifyOtp = R.curry((dbOtp, givenOtp) => {
    if (!dbOtp) return false;
    if (dbOtp.Otp === givenOtp) {
        return true;
    }
    if (dbOtp.Otp !== givenOtp) {

        return false;
    }
});

async function post(req) {
    const { email, password, type, otp } = req.body;
    logInfo('Request for user login', { email, password, type, otp });

    const response = await composeResult(
        (result) => {
            return R.ifElse(
                () => {
                    if (type == "passwordLogin") {
                        return verifyPassword(result, password)
                    }
                    if (type == "otpLogin") {
                        return verifyOtp(result, otp)
                    }
                },
                (res) => {
                    return generateToken(result)
                },
                () => Result.Error(new ValidationError(0, 'Enter valid email and Password!'))
            )(result)
        },

        () => db.findOne(new GetUserForLoginQuery(email)),
    )();
    return respond(response, 'Successfully verified !', 'Failed to verify!');
}
Route.withOutSecurity().noAuth().post('/identity/session/user-login', post).bind();

module.exports.post = post;