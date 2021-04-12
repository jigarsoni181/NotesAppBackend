const { createConnection } = require("./database")
const { config } = require("./config")
const connection = createConnection(config)
connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');

    connection.query("DROP DATABASE notes_app", function (err, result) {
        if (err) throw err;
        console.log("Database dropped");
    });


    connection.query("CREATE DATABASE IF NOT EXISTS notes_app", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });


    
})
module.exports = connection

return { success: true }