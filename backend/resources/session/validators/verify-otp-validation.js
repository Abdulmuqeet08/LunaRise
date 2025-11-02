const {
    validate,
    notEmpty,
    isMobileNumber
} = require('validation');

const rule = {
    otp: [
        [notEmpty, 'OTP is Mandatory']
    ]

};

module.exports.validate = async data => validate(rule, data);
