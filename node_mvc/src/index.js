const express = require("express");
const app = express();
const port = 5000;
const connect = require("./configs/db")


// Importing the controllers.

const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const batchController = require("./controllers/batch.controller");
const evaluationController = require("./controllers/evaluation.controller");
const submissionController = require("./controllers/submission.controller");

// Because express does not know how to read json bodies.
app.use(express.json());


app.use("/users",userController);
app.use("/student",studentController);
app.use("/batch",batchController);
app.use("/evaluation",evaluationController);
app.use("/submission",submissionController);

// Turning on the server and connecting with db.
app.listen(port,async ()=>{
    try{
        await connect()
        console.log("Listening on Port "+port)
    }
    catch(err){
        console.log(err.message)
    }
})