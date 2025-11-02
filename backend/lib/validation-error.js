module.exports = class ValidationError {
    constructor(code, errorMessage) {
        this.code = code;
        console.log("code in vali:",this.code);
        if (typeof (errorMessage) === 'string') {
            this.errorMessage = [errorMessage];
        } else {
            this.errorMessage = errorMessage;
        }
    }
};
