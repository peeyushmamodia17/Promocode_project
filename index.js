//import express
const express=require('express');
const path=require('path');
const app=express();
const port=8000;
//import all the require modules

const db=require('./config/mongoose');
const session= require('express-session');
const bodyParser = require('body-parser');

const crypto=require('crypto');
//It is use as middleware
app.use(express.urlencoded());

//it is a bodyparser
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.use('/',require('./routes'));

//here we listen server at port 8000
app.listen(port,function(err){
    if(err){
        console.log("error in running the server on port");
    }

    console.log("Server successfully running on port",port);
})

module.exports=app;