const express = require("express");
const Student = require("../models/student.model");
const router = express.Router();

// Post api for students.
router.post("",async (req,res)=>{
    try{
        const student = await Student.create(req.body);
        return res.status(201).send(student);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// get api for students.
router.get("",async (req,res)=>{
    try{
        const students = await Student.find()
        .populate({path:"user_id",select:["first_name","last_name"]})
        .populate({path:"batch_id",select:"batch_name"})
        .lean().exec();
        return res.status(201).send(students);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;