const express = require('express')
const router = express.Router()
var notesController = require('../controllers/notes')
var userIdentification = require('../middleware/userAuthentication').identifyUser


router.route('/createNote')
    .post(userIdentification(),notesController.createNote);


router.route('/fetchNotes')
    .get(userIdentification(),notesController.fetchNotes);


router.route('/updateNote/:noteId')
    .patch(userIdentification(),notesController.updateNote);

router.route('/deleteNote/:noteId')
    .delete(userIdentification(),notesController.deleteNote);

module.exports = router;
