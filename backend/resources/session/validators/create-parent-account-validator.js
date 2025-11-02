const { validate, notEmpty, isEmail, isStringNumeric, hasLengthOf } = require('lib/validations/validation');
const rule = {
    email: [
        [notEmpty, 'Email is mandatory!'],
        [isEmail, 'Email is invalid!']
    ],
};

module.exports.validate = async data => validate(rule, data);
