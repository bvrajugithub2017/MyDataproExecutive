const mongoose = require('mongoose');
const SchemaPic = mongoose.Schema;

const employeeUploadPicSchema = new SchemaPic({

  email : {
    type : String
  },
  phone : {
    type : String
  },
  //http://nodejs.javascripti.com/how-to-send-an-image-from-android-client-to-node-js-server-via-httpurlconnection.html
  //  photo : {
  //   type: Buffer
  // },
  //The Buffer data type allows you to save binary data. A common example of binary data would be an image or an encoded file, such as a PDF document.

  photoDescription: {
    type: String
  },

  picDate : {
    type: String
  },

  picTime : {
    type: String
  }
});

//Creating UploadedPics Model (Yet another new Collection would be created in the MongoDB Database)
const employeeUploadedPicsModel = mongoose.model('UploadedPics', employeeUploadPicSchema);

//now exporting the Model
module.exports = employeeUploadedPicsModel;
