const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { composeResult, respond, whenResult } = require('lib');
const db = require('db/repository');
const uuid = require('uuid');
const Result = require('folktale/result/result');
const ValidationError = require('lib/validation-error.js');
const R = require('ramda');
const token = require('lib/token');
const PasswordHash = require('password-hash');

const CreateParentAccountValidator = require('resources/session/validators/create-parent-account-validator.js');
const FindParentByEmailQuery = require('resources/session/queries/find-parent-by-email-query.js');

const NotificationHandler = require("notifications/notification-handler.js");
const Random = require("random-number");
const UpdateParentOtpQuery = require('resources/session/queries/update-parent-otp-query.js');

const generateToken = async (result) => {
  const generatedTokenResult = await token.generate({
    id: result.id,
    name: result.name,
    roles: ['Parent'],
    status: result.status,
    email: result.email,
    phone: result.phone
  });

  return whenResult(generatedToken => Result.Ok({
    id: result.id,
    name: result.name,
    roles: ['Parent'],
    status: result.status,
    email: result.email,
    phone: result.phone,
    token: generatedToken
  }))(generatedTokenResult);
};

const sendOTPNotification = (email, otp) => {
  NotificationHandler.send({
    context: "OTP",
    modes: [
      {
        name: "email",
        to: email,
      },
    ],
    data: {
      otp,
    },
  });
};

async function post(req) {
  let otp = Random.generator({
    min: 1000,
    max: 9999,
    integer: true,
  })();

  if (process.env.NODE_ENV !== "production") {
    otp = 1234;
  }

  const { email } = req.body;

  logInfo('Request to generate otp for email regarding forgot password', email);
  const result = await composeResult(
    (result) => {
      if (!result)
        return Result.Error(new ValidationError(0, 'Email does not exists'))
      return composeResult(
        () => generateToken(result),
        () => db.execute(new UpdateParentOtpQuery(result.id, otp))
      )();
    },
    () => db.findOne(new FindParentByEmailQuery(email, "")),
    CreateParentAccountValidator.validate
  )({ email });

  whenResult((parent) => {
    return sendOTPNotification(parent.email, otp);
  })(result);

  const response = await whenResult((parent) => {
    return Result.Ok(parent);
  })(result);

  return respond(response, 'Successfully generated otp for given mail!', 'Failed to generate otp for given mail!');
}

Route.withOutSecurity().noAuth().post('/identity/session/forgot-password', post).bind();
