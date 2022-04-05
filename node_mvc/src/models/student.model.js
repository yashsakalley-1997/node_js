const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    roll_no: {type:Number,required:true},
    user_id: 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
    batch_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batch",
        required:true
    }
})

// Model.
const Student = mongoose.model("student",studentSchema);

module.exports = Student;
