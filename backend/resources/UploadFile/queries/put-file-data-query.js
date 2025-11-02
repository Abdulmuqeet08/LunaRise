// const { THIS_EXPR } = require('@angular/compiler/src/output/output_ast');
// const Models = require('models');
// const { sequelize } = require("models/index.js");
// module.exports = class PutFileDataQuery {
//     constructor(details) {
//      this.Id= details.Id
//      this.Student = details.Student
//      this.Class = details.Class
//      this.Section = details.Section
//      this.Grade = details.Grade   
//     }



//     async get() {          
//         return await Models.P4U_TestTable.upsert(
//             {
//                 Id: this.Id,
//                 Student: this.Student,
//                 Class: this.Class,
//                 Section: this.Section,
//                 Grade: this.Grade,
//             },
//             {logging:console.log}
//            );
       
    
//     }
// };


const Models = require('models');
const { sequelize } = require("models/index.js");
module.exports = class PutFileDataQuery {
    constructor(details) {
     this.Id= details.Id
     this.Student = details.Student
     this.Class = details.Class
     this.Section = details.Section
     this.Grade = details.Grade
    //  console.log("----Query parameter----",this.Id)  
    }
 
 
   
    async get() {          
        try {
        return await Models.P4U_TestTable.upsert(
            {
                Id: this.Id,
                Student: this.Student,
                Class: this.Class,
                Section: this.Section,
                Grade: this.Grade,
            },
            {logging:console.log}
           );
        } catch (e) {
            console.log(e);
        }
   
    }
};
