const express = require("express");
const { EventEmitter } = require("nodemailer/lib/xoauth2");
const mail = require("../configs/mail");
const User = require("../models/user.model");
const {confirmationMail,adminMail} = require("../utils")

const router = express.Router();
const eventEmitter = new EventEmitter();
const {body,validationResult} = require("express-validator");

router.post("",
    body("first_name").notEmpty().isString().withMessage("First Name should be a string"),
    body("last_name").notEmpty().isString(),
    body("email").notEmpty().isEmail().isString().bail().custom(async (value)=>{
        const mail = await User.findOne({email:value});
        if(mail){
            throw new Error("Email id already exists")
        }
        return true
    }),
    body("pincode").notEmpty().isLength(6).isNumeric(),
    body("age").notEmpty().isInt({min:1,max:1000}),
    body("gender").notEmpty().isString().bail().custom((value)=>{
        const status = (value == "Male" || value == "Female" || value == "Others")
        if(!status){
            throw new Error("Value not allowed")
        }
        return true 
    }), 
    async (req,res)=>{
    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let newErrors;
            newErrors = errors.array().map(err=>{
                return {key: err.param,message:err.msg}
            })
            return res.status(400).send({errors: newErrors});
        }
        eventEmitter.on("User Verification",confirmationMail);
        eventEmitter.on("Admin Verification",adminMail);

        const user = await User.create(req.body);
        eventEmitter.emit("User Verification",{
            from:"admin@masai.com",
            to:user.email,
            firstName:user.first_name,
            lastName:user.last_name
        })
    
        returnAdmin().then((res)=>{
            eventEmitter.emit("Admin Verification",{
                from:"admin@masai.com",
                to:res,
                firstName:user.first_name,
                lastName:user.last_name
            })
        })
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


router.get("",async (req,res)=>{
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 2;
        const users = await User.find().skip((page-1)*size).limit(size).lean().exec();
        return res.status(200).send(users)
    }
    catch(err){
        return req.status(200).send(err.message)
    }
})


const returnAdmin = async () => {
    let admins = [];
    let mails = [];
    const users = await User.find().lean().exec();
    admins = users.filter((elem)=>{
        return elem['email'].includes("admin")
    })
    admins.forEach(element => {
        mails.push(element['email'])
    });
    return mails
}


module.exports = router;