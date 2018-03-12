const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const employeeSchema = new Schema({
  ename : {
    type : String, unique: true
  },
  email : {
    type : String, unique: true
  },
  phone : {
    type : String, unique: true
  },
  state : {
    type : String
  },
  desig :{
    type: String
  },
});

employeeSchema.plugin(uniqueValidator);

//Creating Employee Model
const employeeModel = mongoose.model('Employee', employeeSchema);

//now exporting the Model
module.exports = employeeModel;
