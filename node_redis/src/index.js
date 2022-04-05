const express = require("express");
const app = express();
const port = 5000;
const connect = require("./configs/db");
app.use(express.json());

// Importing the controllers.
const productController = require("./controller/product.controller");

app.use("/products",productController);


// Turning on the server and connection with db.
app.listen(port,async () =>{
    try{
        await connect();
        console.log("listening on port "+port)
    }
    catch(err){
        console.log(err.message)
    }
})