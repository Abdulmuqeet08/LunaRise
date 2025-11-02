const Route = require('route');
const { composeResult, respond } = require('lib');
const db = require('db/repository');
const GetTablesQuery = require('resources/FormBuilder/queries/get-table-names-query');
const GetTableColumnsQuery = require('resources/FormBuilder/queries/get-table-columns-query');
const UpsertFormBuilder = require('../queries/Upsert-Form-Builder');
const GetFieldOptionsQuery = require('../queries/Get-dynamic-options');
const UpsertFormConfigurationQuery=require('../queries/upsert-form-configuration');
const FetchFormConfigurationQuery=require('../queries/fetch-form-configuration')

async function FormBuilderSaveUpdate(req) {
    //console.log('INSERTING THE FORM:', req.body);
    //console.log('Type of req.body:', typeof req.body);
    //console.log('Keys in req.body:', Object.keys(req.body));
    
    // Check if formData is present
    //if (!req.body.formData) {
       // console.error('Error: formData is undefined or missing from request body');
       // return respond(null, '', 'formData is missing in request!');
    //}    
        const response = await composeResult(
            () => db.execute(new UpsertFormBuilder(req.body))
        )();
        return respond(response, 'Successfully saved form!', 'Failed to save form!');
   
}

async function GetFieldOptions(req) {
    // Use composeResult to handle the result of the query execution
    const response = await composeResult(
        () => db.execute(new GetFieldOptionsQuery(req.body))
    )();
    return respond(response, 'Successfully Fetched Field Options !', 'Failed to Fetch Field Options !');

  
}
async function SaveFormData(req) {
    // Use composeResult to handle the result of the query execution
    const response = await composeResult(
        () => db.execute(new UpsertFormConfigurationQuery(req.body))
    )();
    return respond(response, 'Successfully edited !', 'Failed to edited!');

  
}
async function EditFormData(req) {
    console.log('Request to save form details - Full request:', req.body);
    // Use composeResult to handle the result of the query execution
    const response = await composeResult(
        () => db.execute(new FetchFormConfigurationQuery(req.body))
    )();
    return respond(response, 'Successfully edited !', 'Failed to edited!');

  
}

async function GetTableNames(req) {
  console.log('Request to GetTableNames ')
   const response = await composeResult(() =>
         db.execute(new GetTablesQuery())
     )();
 // console.log(response)
   return respond(response, 'Query Successful', 'Query Failed!');
 }
 
 async function GetTableColumns(req) {
   console.log('Request to GetTableColumns ',req.body)
    const response = await composeResult(() =>
          db.execute(new GetTableColumnsQuery(req.body))
      )();
  // console.log(response)
    return respond(response, 'Query Successful', 'Query Failed!');
  }


Route.withOutSecurity().noAuth().post('/FormBuilder/getFormBuilder',  FormBuilderSaveUpdate).bind();
Route.withOutSecurity().noAuth().post('/FormBuilder/getFieldOptions',  GetFieldOptions).bind();
Route.withOutSecurity().noAuth().post('/FormBuilder/edit',  EditFormData).bind();

Route.withOutSecurity().noAuth().post('/FormBuilder/getTableNames', GetTableNames).bind();
Route.withOutSecurity().noAuth().post('/FormBuilder/getTableColumns', GetTableColumns).bind();

module.exports.GetTableColumns = GetTableColumns;
exports.post = FormBuilderSaveUpdate,SaveFormData;