const mysql = require('mysql');
const { config } = require('./config');
let connection = mysql.createConnection({
    ...config,
    database: 'notes_app'
});


connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');

    // connection.query("CREATE DATABASE IF NOT EXISTS notes_app", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");
    // });

    connection.query("CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, fullName VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("Users Table created");
    });

    connection.query("CREATE TABLE IF NOT EXISTS notes (id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), content VARCHAR(255), userId VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("Notes Table created");
    });

    connection.query("CREATE TABLE IF NOT EXISTS note_permissions (id VARCHAR(255) PRIMARY KEY, noteId VARCHAR(255), permission VARCHAR(255), userId VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("NotePermissions created");
    });

    connection.query("CREATE TABLE IF NOT EXISTS roles (id VARCHAR(255) PRIMARY KEY, role VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("NotePermissions created");
    });
    
})

module.exports = connection;

