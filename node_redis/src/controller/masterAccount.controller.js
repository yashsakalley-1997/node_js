const express = require("express");
const Master = require("../models/masterAccount.model");
const Fixed = require("../models/fixedAccount.model");
const router = express.Router();

router.post("",async (req,res)=>{
    try{
        const master = await Master.create(req.body);
        return res.status(201).send(master)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// get api to fetch all master accounts.
router.get("",async (req,res)=>{
    try{
        const masters = await Master.find().populate("user_id").populate("relation_manager").lean().exec();
        return res.status(201).send(masters);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// Api to fetch accounts for a specific master account id.
router.get("/:master_id",async (req,res)=>{
    try{
        return res.status(201).send("hello")
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})
module.exports = router;