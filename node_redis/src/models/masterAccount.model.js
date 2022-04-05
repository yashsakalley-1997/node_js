const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
    balance:{type:Number,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true,unique:true},
    relation_manager:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    branch:{type:mongoose.Schema.Types.ObjectId,ref:"branch",required:true}
},
{
    timestamps:true
});

module.exports = mongoose.model("master_account",masterSchema);
