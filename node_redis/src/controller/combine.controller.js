const express = require("express");
const router = express.Router();
const Fixed = require("../models/fixedAccount.model");
const Saving = require("../models/savingsAccount.model");

let arr = [];
let sum = 0;
router.get("/:master_id",async (req,res)=>{
    try{
        const savings = await Saving.find({master_account:req.params.master_id}).select(["account_number","balance"]).lean().exec();
        const fixeds = await Fixed.find({master_account:req.params.master_id}).select(["account_number","balance"]).lean().exec();
        arr = savings.concat(fixeds);
        arr.forEach(element => {
            sum+=Number(element['balance'])
        });
        return res.status(201).send(arr);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;