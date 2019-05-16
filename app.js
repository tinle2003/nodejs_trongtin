const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'project_manga'
})

db.connect((err)=>{
    if(err){
        throw err;
    }

    console.log("Connect database");
})
global.db = db;

var app = express();
app.use(cors());

app.use(bodyParser.json());

app.set("views",__dirname+"/apps/views");
app.set("view engine","ejs");

app.use("/assets",express.static(__dirname+"/public"));
// app.use(express.static(__dirname+"/public"));

app.use("/",require("./apps/controllers/"));

app.listen(3000,()=>{
    console.log("Server is running...");
})