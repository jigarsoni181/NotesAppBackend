const mysql = require('mysql');

function createConnection(params ) {
    return mysql.createConnection(params)
}
module.exports.createConnection = createConnection