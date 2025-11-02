const {
    validate,
    notEmpty,
    isEmail,
    isMobileNumber
} = require('validation');

const rule = {
    name: [
        [notEmpty, 'name is empty']
    ]

};

module.exports.validate = async data => validate(rule, data);
