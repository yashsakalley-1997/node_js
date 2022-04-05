const add = require("./add");
const subtract = require("./subtract");
const multiply = require("./multiply");
const divide = require("./divide");


const EventEmitter = require("events");
const eventEmitter = new EventEmitter();


let a = 10;
let b = 20;


function matheMatics(){
    eventEmitter.on("Math",()=>{
        add(a,b)
    });

    eventEmitter.on("Math",()=>{
        subtract(a,b)
    });
    
    eventEmitter.on("Math",()=>{
        multiply(a,b)
    });
    
    eventEmitter.on("Math",()=>{
        divide(a,b)
    });
    
    eventEmitter.emit("Math");
}

matheMatics()
