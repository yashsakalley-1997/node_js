const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();
const redis = require("../configs/redis");

// get all data.
router.get("",async (req,res)=>{
    try{
        redis.get("allProducts", async function (err,fetchedProducts){
            if(err){
                return res.status(500).send({err:err.message});
            }
            if(fetchedProducts){
                return res.status(200).send({products:JSON.parse(fetchedProducts),redis:true})
            }
            const products = await Product.find().lean().exec()
            redis.set("allProducts",JSON.stringify(products))
            return res.status(200).send({products,redis:false});
        })
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

// get data beloging to an id.
router.get("/:id",async (req,res)=>{
    try{
        redis.get(`products.${req.params.id}`,async function (err,fetchedProduct){
            if(err){
                return res.status(500).send({err:err.message});
            }
            if(fetchedProduct){
                return res.status(500).send({product:JSON.parse(fetchedProduct),redis:true})
            }
            const product = await Product.findById(req.params.id);
            redis.set(`products.${req.params.id}`,JSON.stringify(product))
            return res.status(200).send({product,redis:false})
        })
    }
    catch(err){
        return res.send(500).send({message:err.message})
    }
})


// inserting the data
router.post("",async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        const products = await Product.find().lean().exec();
        redis.set("allProducts",JSON.stringify(products))
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


// update.
router.patch("/:id",async (req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        const products = await Product.find().lean().exec();
        redis.set(`products.${req.params.id}`,JSON.stringify(product));
        redis.set("allProducts",JSON.stringify(products))
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// Delete.
router.delete("/:id",async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        const products = await Product.find().lean().exec();
        redis.del(`products.${req.params.id}`);
        redis.set("allProducts",JSON.stringify(products))
        return res.status(200).send({product});
    }
    catch(err){
        return res.status(500).send({err:err.message})
    }
} )
module.exports = router;