const express = require("express");
const Savings = require("../models/savingsAccount.model");
const Master = require("../models/masterAccount.model");
const router = express.Router();

// Post api to create a savings account
router.post("",async (req,res)=>{
    try{
        const saving = await Savings.create(req.body);
        const filter = { _id: req.body.master_account };
        const update = { balance: req.body.balance };
        // console.
        let doc = await Master.findOneAndUpdate(filter, update, {
            new: true
          });
        return res.status(201).send(saving)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})



router.get("",async (req,res)=>{
    try{
        const savings = await Savings.find().lean().exec();
        return res.status(201).send(savings);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;