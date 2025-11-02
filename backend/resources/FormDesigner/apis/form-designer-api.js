const Route = require('route');
// const { logInfo } = require('lib/functional/logger');
const {  respond, composeResult } = require('lib');
const db = require('db/repository');

const GetFormDetailsQuery = require('../queries/get-form-details-query');
const GetFieldOptionsQuery = require('../queries/get-field-options-query');
const upsertFormDetailsQuery=require('../queries/Upsert-form-details-query');
const FetchFormDataQuery=require('../queries/fetch-Form-Data-query');
const FetchDynamicOptionsQuery=require('../queries/fetch-dynamic-options-query');


async function getDynamicOptions(req) {
    console.log('Request to get dynamic options', req.body);
    
        console.log('Incoming request:', req.body);
        const response = await composeResult(
            ()=>db.execute(new FetchDynamicOptionsQuery(req.body))
        )();
        console.log('Response:', response);
        return respond(response, 'Successfully Fetched Dynamic Options !', 'Failed to Fetch Dynamic Options !');
    
}   

async function getFormDetails(req) {
    console.log('Request to get form details', req.body.entity);
    const response = await composeResult(
        ()=>db.execute(new GetFormDetailsQuery(req.body.entity))
    )();
    return respond(response, 'Successfully Fetched Form Details !', 'Failed to Fetch Form Details !');
}

async function getFieldOptions(req) {
    console.log('Request to get field options', req.body);
   
        console.log('Incoming request:', req.body);
        const response = await composeResult(
            ()=>db.execute(new GetFieldOptionsQuery(req.body))
        )();
        console.log('Response:', response);
        return respond(response, 'Successfully Fetched Field Options !', 'Failed to Fetch Field Options !');
    
    
}

async function SaveFormDetails(req) {   
    console.log('Request to save form details - Full request:', req.body);
   

        console.log('Prepared payload for query:', req.body);
        
        const response = await composeResult(
            () => db.execute(new upsertFormDetailsQuery(req.body))
        )();
        return respond(response, 'Successfully Saved Form Details!', 'Failed to Save Form Details!');
    }

async function fetchFormData(req) {   
console.log('Request to Fetch the Forms', req.body); 
    const response = await composeResult(
    () => db.execute(new FetchFormDataQuery()))
    ();
    return respond(response, 'Successfully Saved Form Details!', 'Failed to Save Form Details!');
}
 





Route.withOutSecurity().noAuth().post('/FormDesigner/getFormData', getFormDetails).bind();
Route.withOutSecurity().noAuth().post('/FormDesigner/getFieldOptions', getFieldOptions).bind();
Route.withOutSecurity().noAuth().post('/FormDesigner/SaveFormDetails',SaveFormDetails).bind();
Route.withOutSecurity().noAuth().get('/FormDesigner/fetchFormData', fetchFormData).bind();
Route.withOutSecurity().noAuth().post('/FormDesigner/getDynamicOptions', getDynamicOptions).bind();

module.exports.post = getFormDetails;

