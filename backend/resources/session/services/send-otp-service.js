const { logInfo, logError } = require('lib/functional/logger');
const { whenResult } = require('lib');
const Result = require('folktale/result');
const R = require('ramda');
const { respond, composeResult } = require("lib");
const Mailer = require('notifications/modes/mailer');
const SMS = require('notifications/modes/sms');
const otpGenerator = require('otp-generator');
const OtpSent = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });

module.exports.perform = async (email) => {
  logInfo('Request to send OTP', {});
  const sendSuccessMail = () => Mailer.send({
    to: email,
    otp: OtpSent,
    subject: 'Your OTP is here',
    html: `${OtpSent} is the OTP sent.`
  });

  const response = await composeResult(
    () => sendSuccessMail()
  )();
  console.log("response from send otp", response)
  return response;


};
