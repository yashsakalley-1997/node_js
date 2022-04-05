const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    file_name:{type:String,required:true}
})

module.exports = mongoose.model("profile_users",userSchema);
