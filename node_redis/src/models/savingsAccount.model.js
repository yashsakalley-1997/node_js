const mongoose = require("mongoose");

const saving_schema = new mongoose.Schema({
    account_number:{type:Number,required:true,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},
    master_account:{type:mongoose.Schema.Types.ObjectId,ref:"master_account",required:true}
},{
    timestamps:true
})

module.exports = mongoose.model("savings_account",saving_schema);

