const R = require('ramda');

const maxValue = R.curry((max, value, temp) => {
    console.log(max);
    console.log(value);
    console.log(temp);
    value < max
});

module.exports = maxValue;
