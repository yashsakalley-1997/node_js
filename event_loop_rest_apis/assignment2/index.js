const express = require("express");
const app = express();
const port = 8000;

let books = require("./books.json");

app.get("",(req,res)=>{
    return res.send("Hello")
})

app.get("/books",(req,res)=>{
    return res.send(books.books)
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
