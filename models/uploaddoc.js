const mongoose = require('mongoose');
const SchemaDoc = mongoose.Schema;

const employeeUploadDocSchema = new SchemaDoc({

  email : {
    type : String
  },
  phone : {
    type : String
  },

  finalfilename: {
    type: String
  },

  docDate : {
    type: String
  },

  docTime : {
    type: String
  }
});

//Creating UploadedDocs Model (Yet another new Collection would be created in the MongoDB Database)
const employeeUploadedDocsModel = mongoose.model('UploadedDocs', employeeUploadDocSchema);

//now exporting the Model
module.exports = employeeUploadedDocsModel;
