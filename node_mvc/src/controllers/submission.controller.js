const express = require("express");
const Submission = require("../models/submission.model");
const { route } = require("./user.controller");
const router = express.Router();

router.post("",async (req,res)=>{
    try{
        const submission = await Submission.create(req.body);
        return res.status(201).send(submission);
    }

    catch(err){
        return res.status(500).send(err.message);
    }
})

// get api for submissions.
router.get("",async (req,res)=>{
    try{
        const submission = await Submission.find()
        .populate({
            path:"student_id",
            populate:{
                path:"user_id",
                model:"user",
                select:["first_name","last_name"]
            }
        },)
        .lean().exec();

        return res.status(201).send(submission);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


// get students who gave a particular evaluation.
router.get("/:evaluation_id",async (req,res)=>{
    try{
        const submissions = await Submission.find({"evaluation_id":req.params.evaluation_id})
        .populate({
            path:"student_id",
            populate:{
                path:"user_id",
                model:"user",
                select:["first_name","last_name"]
            }
        },).lean().exec();
        return res.status(201).send(submissions);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// get student with highest score for an evaluation
router.get("/max/:evaluation_id",async (req,res)=>{
    try{
        const submission = await Submission.find({evaluation_id:req.params.evaluation_id},)
        .populate({
            path:"student_id",
            select:"user_id",
            populate:{
                path:"user_id",
                model:"user",
                select:["first_name","last_name"]
            }
        }).lean().exec();
        let max = 0;
        submission.forEach(element => {
            if(element['marks']>max){
                max = element['marks']
            }
        });
        
        let arr = submission.filter((elem) => elem['marks'] === max)
        return res.status(201).send(arr)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})
module.exports = router;