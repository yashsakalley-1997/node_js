const express = require("express");
const app = express();
const port = 5000;

let middleware1 = (req,res,next)=>{
    console.log("Fetching all books");
    next();
}

let singleBook = (req,res,next)=>{
    req.name = req.params.name;
    next()
}


app.get("/books",middleware1,(req,res)=>{
    return res.send({status:"Sending all the books"})
})

app.get("/book/:name",singleBook,(req,res)=>{
    return res.send({bookName:req.name})
})


app.listen(port,()=>{
    console.log(`Listen on port ${port}`)
})