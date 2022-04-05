const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    date_of_evaluation:{type:String,required:true},
    instructor:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    batch_id:{type:mongoose.Schema.Types.ObjectId,ref:"batch",required:true}
})


module.exports = mongoose.model("evaluation",evaluationSchema);