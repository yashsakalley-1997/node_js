const express = require("express");
const app = express();
const port = 5000;
const connect = require("./configs/db");

// Importing the controllers.
const userController = require("./controllers/user.controller");


app.use(express.json());
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