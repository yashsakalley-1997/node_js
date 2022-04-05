const express = require("express");
const Evaluation = require("../models/evaluation.model");

const router = express.Router();

router.post("",async (req,res)=>{
    try{
        const evaluation = await Evaluation.create(req.body);
        return res.status(201).send(evaluation);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// get api for evaluation.
router.get("",async (req,res)=>{
    try{
        const evaluation = await Evaluation.find()
        .populate({path:"instructor",select:["first_name","last_name"]})
        .populate({path:"batch_id",select:["batch_name"]})
        .lean().exec();
        return res.status(201).send(evaluation);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;