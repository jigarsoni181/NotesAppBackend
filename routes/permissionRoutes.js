const express = require('express')
const router = express.Router()
var permissionsController = require('../controllers/permissions')
var userIdentification = require('../middleware/userAuthentication').identifyUser

console.log(permissionsController.createPermission)
router.route('/createPermission/:noteId')
    .post(userIdentification(),permissionsController.createPermission);


router.route('/fetchUsers/:noteId')
    .get(userIdentification(),permissionsController.fetchUsersForNote);


router.route('/deletePermission/:permissionId')
    .delete(userIdentification(),permissionsController.deletePermission);

module.exports = router;
