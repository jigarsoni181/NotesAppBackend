const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser")
const DB  = require("./database")
const notesRoutes = require("./routes/notesRoutes")
const userRoutes = require("./routes/userRoutes")
const permissionRoutes = require("./routes/permissionRoutes")
var cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(notesRoutes)
app.use(userRoutes)
app.use(permissionRoutes)

// var mysqlConnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password:"password",
//     database : "keepernotes",
//     // multipleStatements: true
// });


// mysqlConnection.connect((err)=>{
//     if(err){
//         console.log(err)
//         // throw err;
//     }else
//     {
//         console.log("Connection successful")
//     }
// })









app.listen(3000,()=>{
    console.log("Server is Up and Running")
})