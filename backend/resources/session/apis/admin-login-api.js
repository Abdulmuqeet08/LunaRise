const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { whenResult, respond, composeResult } = require('lib');
const ValidationError = require('lib/validation-error');

const token = require('lib/token');
const R = require('ramda');
const Result = require('folktale/result');
const config = require('config-handler');

const GetAdminForLoginQuery = require('resources/session/queries/get-admin-for-login-query');
const db = require('db/repository');
const date = new Date();
const exp = Math.floor((date.setDate(date.getDate() + 7)) / 1000);
var aes256 = require("aes256");
passwordSent='';
verificationResponse='Failed to verify!';

const generateToken = async (result) => {
    // console.log("result in generateToken:",result.dataValues.p4u_appConfig);
    const generatedTokenResult = await token.generate({
        UserID: result.dataValues.UserID,
        UserName: result.dataValues.UserName,
        Email: result.dataValues.Email,
        RoleID:1,
        role: ['Guest'],
        IsActive: result.dataValues.IsActive,
        exp:exp,
        theme:result.dataValues.p4u_appConfig?result.dataValues.p4u_appConfig.dataValues.theme:'',
        scheme:result.dataValues.p4u_appConfig?result.dataValues.p4u_appConfig.dataValues.scheme:'',
        layout:result.dataValues.p4u_appConfig?result.dataValues.p4u_appConfig.dataValues.layout:''
    });
    // console.log("result in generatedTokenResult:",generatedTokenResult.value);
    return whenResult(generatedToken => Result.Ok({
        UserID: result.dataValues.UserID,
        UserName: result.dataValues.UserName,
        Email: result.dataValues.Email,
        RoleID:1,
        roles: ['Guest'],
        IsActive: result.dataValues.IsActive,
        token: generatedToken,
        theme:result.dataValues.p4u_appConfig?result.dataValues.p4u_appConfig.dataValues.theme:'',
        scheme:result.dataValues.p4u_appConfig?result.dataValues.p4u_appConfig.dataValues.scheme:'',
        layout:result.dataValues.p4u_appConfig?result.dataValues.p4u_appConfig.dataValues.layout:''
        
    }))(generatedTokenResult,result);
};

async function checkCredentials(result) {

    if(!result){       
        return Result.Error("UserName Doesn't exist")
    }

  
        let dbPassword = aes256.decrypt(config.jwt_secret, result.dataValues.PasswordHash );
       
        if (dbPassword === this.passwordSent.trim()) {
            // console.log("post password verification")
            return generateToken(result);
        } else {
            this.verificationResponse={
                status:"Invalid Credentials",
                UserID:result[0].UserID
            };
            return Result.Error("Invalid Credentials");
        }
    // }
}

async function post(req) {
    console.log("Request for user login:",req.body)   
   this.passwordSent=req.body.password;
    const response = await composeResult(  
        (result) => {
            // console.log("---query response----",result)
            if(result==undefined || result==''){
                this.verificationResponse={
                    status:"Invalid Credentials",
                    id_user:0
                };
                return Result.Error("Invalid Credentials");
            }
            return checkCredentials(result)
        },
        () => db.findOne(new GetAdminForLoginQuery(req.body))
    )();

//   console.log(response);
    return respond(response, 'Successfully verified !', this.verificationResponse);
}
Route.withOutSecurity().noAuth().post('/session/admin-login', post).bind();

module.exports.post = post;
