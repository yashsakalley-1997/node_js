const express = require("express");
const Fixed = require("../models/fixedAccount.model");
const Master = require("../models/masterAccount.model");
const router = express.Router();


router.post("",async (req,res)=>{
    try{
        const fixed = await Fixed.create(req.body);
        const filter = { _id: req.body.master_account };
        const update = { balance: req.body.balance };
        let doc = await Master.findOneAndUpdate(filter, update, {
            new: true
          });
        return res.status(201).send(fixed)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

router.get("",async (req,res)=>{
    try{
        const fixeds = await Fixed.find().lean().exec();
        return res.status(201).send(fixeds);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


// Delete api.


module.exports = router;