var sql = require('../database');
// var moment = require('moment');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
const { Operations } = require("../operations/operations")



module.exports.createNote = function (req, res) {
    const { body } = req;

    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }
    let insertobj = {
        id: Operations.generateId(),
        title: body.title,
        content: body.content,
        userId: req["user_info"].id
    }
    sql.query('INSERT INTO notes SET ?', insertobj, function (err1, result) {
        if (err1) {
            return res.status(500).json({
                status: false,
                error: err1,
                message: "Database Error"
            })
        } else {
            const notePermisson = {
                id: Operations.generateId(),
                noteId: insertobj.id,
                userId: req["user_info"].id,
                permission: "OWNER"
            }
            sql.query('INSERT INTO note_permissions SET ?', notePermisson, function (err1, result) {
                if (err1) {
                    return res.status(500).json({
                        status: false,
                        error: err1,
                        message: "Database Error"
                    })
                } else {
                    return res.status(200).json({
                        auth: true,
                        data: insertobj,
                        message: " Added note successfully.",
                    })
                }
            })
        }
    })
}

module.exports.fetchNotes = function (req, res) {
    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }
  
    sql.query(`SELECT no.userId, no.id, no.content, no.title, perm.permission FROM note_permissions perm LEFT JOIN notes no ON no.id = perm.noteId WHERE perm.userId = '${req["user_info"].id}'`, function (err1, result) {
        if (err1) {
            return res.status(500).json({
                status: false,
                error: err1,
                message: "Database Error"
            })
        } else {
            console.log(result)
            return res.status(200).json({
                auth: true,
                data: result,
            })
        }

    })
}

module.exports.updateNote = function (req, res) {
    const { body } = req;
    
    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }

    sql.query(`UPDATE notes SET ? WHERE id = '${req.params.noteId}'`, body, function (err1, result) {
        if (err1) {
            return res.status(500).json({
                status: false,
                error: err1,
                message: "Database Error"
            })
        } else {
            if(!result.affectedRows) {
                return res.status(404).json({
                    status: false,
                    error: err1,
                    message: "Note not found"
                })
            }

            return res.status(200).json({
                auth: true,
                data: result,
                message: !result.changedRows ? "No update" : "Updated successfully",
            })
        }
    })
}

module.exports.deleteNote = function (req, res) {
    const { body } = req;
    
    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }

    sql.query(`DELETE FROM notes WHERE id = '${req.params.noteId}'`, function (err1, result) {
        if (err1) {
            return res.status(500).json({
                status: false,
                error: err1,
                message: "Database Error"
            })
        } else {
            if(!result.affectedRows) {
                return res.status(404).json({
                    status: false,
                    error: err1,
                    message: "Note not found"
                })
            }

            return res.status(200).json({
                auth: true,
                data: result,
                message: "Deleted note successfully.",
            })
        }
    })
}


