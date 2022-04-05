const express = require("express");
const User = require("../models/user.model");
const router = express.Router();


// Post api for users.
router.post("",async (req,res)=>{
    try{
        const user = await User.create(req.body);
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// get api for users.
router.get("",async (req,res)=>{
    try{
        const users = await User.find().lean().exec();
        return res.status(201).send(users);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;