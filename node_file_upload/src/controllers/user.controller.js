const express = require("express");
const router = express.Router();
const fs = require("fs");

const User = require("../models/user.model");
const Gallery = require("../models/gallery.model");

const upload = require("../middlewares/file_upload");


router.post("/single",upload.single("profile_pic"),async (req,res)=>{
    try{
        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            file_name:req.file.path
        })
        return res.status(200).send(user);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.post("/gallery",upload.any("profile_pic"),async (req,res)=>{
    try{
        const filePaths = req.files.map((file) => file.path);
        const gallery = await Gallery.create({
            user_id:req.body.user_id,
            pictures: filePaths
        })
        return res.status(200).send(gallery);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.patch("/update/:id",upload.single("profile_pic"), async (req,res)=>{
    try{
        const filePath = await User.findOne({_id:req.params.id})
        fs.unlink(filePath['file_name'],(err)=>{
            if(err){
                console.log(err)
            }
        })
        
        const user = await User.findOneAndUpdate({_id:req.params.id},{file_name:req.file.path},{
            new:true
        })
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.delete("/delete/:id",async (req,res)=>{
    try{
        const user = User.findByIdAndDelete(req.params.id).lean().exec();
        const filePath = await User.findOne({_id:req.params.id})
        fs.unlink(filePath['file_name'],(err)=>{
            if(err){
                console.log(err)
            }
        })
        return res.status(200).send("User deleted")
    }
    catch(err){
        return res.status(500).send({err:err.message})
    }
})


router.get("",async (req,res)=>{
    try{
        const users = await User.find().lean().exec();
        return res.status(200).send(users)
    }
    catch(err){
        return res.status(500).send({err:err.message})
    }
})

module.exports = router;