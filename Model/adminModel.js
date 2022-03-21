const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true},
    role:{type:String,required:true},
    image:{type:String,required:true},
    password:{type:String,required:true}
})
const adminModel = mongoose.model('admin',adminSchema);
module.exports= adminModel;
