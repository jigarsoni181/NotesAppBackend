const mysql = require('mysql');
const { Operations } = require("../operations/operations")

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'notes_app'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
    let insertobj = {
        id: "7bed0613-7e2e-4a80-a6df-b312e8373b22",
        fullName: "Jigar Soni"
    }

    connection.query('INSERT INTO users SET ?', insertobj, function (err1, result) {
        if (err1) {
            console.log("DB ERROR")
            console.log(err1)
        } else {
            console.log(" Added user successfully.")
        }
    })
})
module.exports = connection
