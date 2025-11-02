const {
    validate,
    notEmpty,
    isEmail,
    isMobileNumber
} = require('validation');

const rule = {
    email: [
        [notEmpty, 'email is Mandatory'],
        [isEmail, 'email is Not Valid']
    ]

};

module.exports.validate = async data => validate(rule, data);
