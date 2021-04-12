var sql = require('../database');
var moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('../config');
const { Operations } = require('../operations/operations');

module.exports.registerUser = function (req, res) {
    let insertobj = {
        fullName: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        id: Operations.generateId()
    }

    if(req.body.email.length === 0 || req.body.name.length ===0 || req.password.length ===0 ) {
        return res.status(400).json({
            status: false,
            error: {},
            message: "Bad Request"
        })
    }
    sql.query('INSERT INTO users SET ?', insertobj, function (err1, result) {
        if (err1) {
            if(err1.code === "ER_DUP_ENTRY") {
                return res.status(412).json({
                    status: false,
                    error: err1,
                    message: "Email Id already exists"
                })
            }
            return res.status(500).json({
                status: false,
                error: err1,
                message: "Could not register"
            })
        } else {
            let token = jwt.sign({ id: insertobj.id }, "super", {
                expiresIn: 86400 // expires in 24 hours
            });
    
            return res.status(200).json({
                auth: true,
                token: token,
                message: " Added user successfully.",
                user: result
            })
        }
    })
}

module.exports.loginUser = function (req, res) {

    sql.query('SELECT * FROM users WHERE email = ?', req.body.email, function (err1, user) {
        if (err1) return res.status(500).json({ status: false, message: 'Something wrong in db.' });
        if (!user || user.length == 0) return res.status(404).json({ status: false, message: 'No user found.' });
        bcrypt.compare(req.body.password, user[0].password, function (err, _res) {
            if (_res) {
                let token = jwt.sign({ id: user[0].id }, "super", {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({ status: true, auth: true, token: token, user: user[0] });
            } else {
                return res.status(401).json({ auth: false, token: null, status: false, message: 'User Auth Failed' });

            }
        });





    })
}

