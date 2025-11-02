const {
    validate,
    notEmpty,
    isEmail,
    isMobileNumber
} = require('validation');

const rule = {
    password: [
        [notEmpty, 'password is Mandatory'],
    ]

};

module.exports.validate = async data => validate(rule, data);
