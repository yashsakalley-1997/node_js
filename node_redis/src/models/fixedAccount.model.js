const mongoose = require("mongoose");

const fixedSchema = new mongoose.Schema({
    account_number:{type:Number,required:true,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},
    startDate:{type:Date,required:true},
    maturityDate:{type:Date,required:true},
    master_account:{type:mongoose.Schema.Types.ObjectId,ref:"master_account",required:true}
}
,
{
    timestamps:true
})

module.exports = mongoose.model("fixed_account",fixedSchema);


