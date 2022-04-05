
const express = require("express");
const mongoose = require("mongoose");


// Importing the models.
const Section = require("../model/section.model");
const Book = require("../model/book.model");
const Author = require("../model/author.model");


const app = express();
// Adding the .json middleware.
app.use(express.json())





// Post APIs for Books.
app.post("/books",async (req,res)=>{
    try{
        const book = await Book.create(req.body);
        return res.status(201).send(book);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// Post APIs for section.
app.post("/sections",async (req,res)=>{
    try{
        const section = await Section.create(req.body);
        return res.status(201).send(section);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// Post APIs for authors.
app.post("/authors",async (req,res)=>{
    try{
        const author = await Author.create(req.body);
        return res.status(201).send(author);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// find all Books.
app.get("/books",async (req,res)=>{
    try{
        const books = await Book.find().
        populate({path:"section_id",select: "section_name"}).
        populate({path:"author_ids",select: ["first_name","last_name"]}).lean().exec();
        return res.status(201).send(books);
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
})

// find all books in a particular section.
app.get("/books/:section_id",async (req,res)=>{
    try{
        const books = await Book.find({"section_id":req.params.section_id}).lean().exec();
        return res.status(201).send(books);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

// find all books of a particular author.
app.get("/books/author/:author_id",async (req,res)=>{
    try{
        const books = await Book.find({"author_ids":req.params.author_id}).lean().exec();
        return res.status(201).send(books)
    }
    catch(err){
        return res.status(500).send(er.message);
    }
})


// find all books of a particular author inside a section.
app.get("/books_author",async (req,res)=>{
    try{
        const books = await Book.find({"$and":[{"section_id":req.body.section_id},{"author_ids":req.body.author_id}]}).lean().exec();
        return res.status(201).send(books);
    }
    catch(err){
        return res.status(500).send(er.message);
    }
})


app.listen(5000,async ()=>{
    try{
        await connnect();
        console.log("Listening on Port 5000")
    }
    catch(err){
        console.log(err.message)
    }
})
