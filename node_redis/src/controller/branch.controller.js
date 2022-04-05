const express = require("express");
const Branch = require("../models/branch.model")
const router = express.Router();

router.post("",async (req,res)=>{
    try{
        const branch = await Branch.create(req.body);
        return res.status(201).send(branch)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


router.get("",async (req,res)=>{
    try{
        const branches = await Branch.find().lean().exec();
        return res.status(201).send(branches);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;