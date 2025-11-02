// Import dependencies
const Route = require('route');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const PutFileDataQuery = require("../queries/put-file-data-query")
const { whenResult, respond, composeResult } = require("lib");
const db = require('db/repository');
const { Result } = require('postcss');
 
const results = [];
// Upload folder
const UPLOAD_DIR = 'D:/bitbucket/upload';
 
// Check for Excel file types
function checkExcelFile(file) {
  const types = ['xls','xlsx'];
  return types.includes(path.extname(file.name).slice(1));
} 
 
  async function uploadExcel(req, res) {
    console.log("request to upload and parse a file")
    // let file;
   

 
    //   if(!req.files || Object.keys(req.files).length === 0) {
    //     throw new Error('No file uploaded');
    //   }
    //    file = req.files.excelFile;
        
    //   if(!checkExcelFile(file)) {
    //     throw new Error('Only Excel files allowed ');
    //   }
    //   // console.log("----file----",file)
 
    //   const fileName = `${file.name}`;
    //   const destPath = `${UPLOAD_DIR}/${fileName}`;
    //   // console.log("----file----",fileName)
    //   fs.writeFile(destPath, file.data, (err) => {
    //     if (err) throw err;
    //   });
    //   const workbook = xlsx.read(file.data, {type: 'buffer'});
    //   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //   const rows = xlsx.utils.sheet_to_json(worksheet);
    //  // console.log(rows);
    //   for(const row of rows) {
    //     console.log("----row----",row)  

    //   const response = await composeResult(
    //       () => db.execute(new PutFileDataQuery(row))
    //       )();

    //     //  return respond(response, "Successfully Fetched !", "Failed to Fetch!");
    //       results.push(response); 
    //   }   
    response=Result.OK("hi")
      
    return respond(response, "Successfully Deleted !", "Failed to Delete!");
      // res.status(200).json({
      //   msg:"File Parsed and uploaded Successfully!",
      //   success: true,
      //  // result: response
      //  results
      // });
 

 
  }
   
 
// Route.withSecurity().noAuth().post("/uploadandparse", uploadExcel).bind();
Route.withSecurity().noAuth().post("/uploadandparse", uploadExcel).bind();



// // Import dependencies
// const Route = require('route');
// const fs = require('fs');
// const path = require('path');
// const xlsx = require('xlsx'); 
// const PutFileDataQuery = require("../queries/put-file-data-query")
// const { whenResult, respond, composeResult } = require("lib");
// const db = require('db/repository');
// // Upload folder
// const UPLOAD_DIR = 'D:/fileupload';

// // Check for Excel file types
// function checkExcelFile(file) {
//   const types = ['xls','xlsx'];
//   return types.includes(path.extname(file.name).slice(1));
// }
//   async function uploadExcel(req, res) {
//     let file;
    
//     try {
  
//       if(!req.files || Object.keys(req.files).length === 0) {
//         throw new Error('No file uploaded');
//       }
//        file = req.files.excelFile;
      
//       if(!checkExcelFile(file)) {
//         throw new Error('Only Excel files allowed');
//       }
//       // console.log("----file----",file)
//       const fileName = `${file.name}`;
//       const destPath = `${UPLOAD_DIR}/${fileName}`;
//        console.log("----file----",fileName)
//       fs.writeFile(destPath, file.data, (err) => {
//         if (err) throw err;
//       });
//       const workbook = xlsx.read(file.data, {type: 'buffer'});
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = xlsx.utils.sheet_to_json(worksheet);
  
//       // rows contains the parsed data
//       console.log(rows);
//       for(const row of rows) {   
//         console.log("Inserting row", row.Id);
//         const response = await composeResult(
//           () => db.execute(new PutFileDataQuery(row))
//           )();

//           return respond(response, "Successfully Fetched !", "Failed to Fetch!");
//       }
    
//       // res.status(200).json({
//       //   msg:"File Parsed and uploaded Successfully!",
//       //   success: true,
//       //   result: rows
//       // });
//     } catch (error) {
//      res.status(500).json({error: error.message}); 
//     }
//   }
    
// Route.withOutSecurity().noAuth().post("/fileupload", uploadExcel).bind();