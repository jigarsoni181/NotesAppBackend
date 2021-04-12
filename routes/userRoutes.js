const express = require('express')
const router = express.Router()
var userController = require('../controllers/users')

router.route('/register')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

module.exports = router;
