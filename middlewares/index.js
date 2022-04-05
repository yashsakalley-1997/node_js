const express = require("express");

const app = express();

app.get("/user",logger1, (req, res) => {
  return res.send("Hello");
});



app.get("/users",logger1,logger2,(req, res) => {
  console.log("route handler");
  res.send({firstname:req.firstname,lastname:req.lastname});
});

function logger1(req, res, next) {
  console.log("before middleware 1");
  req.firstname = "Yash"
  next();
  console.log("after middleware 1");
}

function logger2(req, res, next) {
  console.log("before middleware 2");
  req.lastname = "Sakalley"
  next();
  console.log("after middleware 2");
}

app.listen(2345, function () {
  console.log("listening on port 2345");
});