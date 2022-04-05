const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    ifsc:{type:String,required:true},
    micr:{type:Number,required:true}
},
{
    timestamps:true
})

module.exports = mongoose.model("branch",branchSchema)

