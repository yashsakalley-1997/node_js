const express = require("express");
const path = require('path');
const app = express();
const port = 5000;
const connect = require("./configs/db");


// Importing the controllers.
const userController = require("./controllers/user.controller");
const userAuth = require("./controllers/user_auth.controller");

app.use(express.json());
app.post("/users",userAuth)
app.use("/users",userController);


// Turning on the server and connecting with the db.
app.listen(port,async ()=>{
    try{
        await connect()
        console.log("Listening on "+port)
    }
    catch(err){
        console.log(err.message)
    }
})