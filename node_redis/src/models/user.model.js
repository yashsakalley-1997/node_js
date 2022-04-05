const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type:String,required:true},
    middleName : {type:String,required:false},
    lastName: {type:String,required:true},
    email: {type:String,required:true},
    address: {type:String,required:true},
    gender: {type:String,required:false,default:"Female"},
    age : {type:Number,required:true},
    type: {
        type:String,
        required:false,
        enum:["customer","employee"],
        default:"customer"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema)

