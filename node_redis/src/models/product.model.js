const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    "name":{type:String,required:true},
    "price":{type:Number,required:true}
},
{
    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model("redis_product",productSchema)

