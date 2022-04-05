const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    evaluation_id:{type:mongoose.Schema.Types.ObjectId,ref:"evaluation",required:true},
    student_id:{type:mongoose.Schema.Types.ObjectId,ref:"student",required:true},
    marks:{type:Number,required:true}
})


const Submission = mongoose.model("submission",submissionSchema);
module.exports = Submission;
