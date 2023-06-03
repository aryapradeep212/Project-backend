const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://aryapradeep212:Arya@cluster0.zbd2evl.mongodb.net/?retryWrites=true&w=majority')

let Schema = mongoose.Schema;

//Schema Creation of User Details
const adminSchema = new Schema({
 
  username:
  {
    type: String,
    unique:true,
    required:true
  },
  password: {
    type:String,
    required:true
  }
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports =adminModel;
  
