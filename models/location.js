const mongoose = require('mongoose');
const SchemaLocation = mongoose.Schema;

const employeeLocationSchema = new SchemaLocation({

  email : {
    type : String
  },
  phone : {
    type : String
  },
  latitude : {
    type : String
  },
  longitude :{
    type: String
  },

  ldate : {
    type: String
  },

  ltime : {
    type: String
  }
});

//Creating Location Model (A new Collection would be created in the MongoDB Database)
const employeeLocationModel = mongoose.model('Location', employeeLocationSchema);

//now exporting the Model
module.exports = employeeLocationModel;
