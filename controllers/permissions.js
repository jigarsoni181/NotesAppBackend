var sql = require('../database');
// var moment = require('moment');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
const { Operations } = require("../operations/operations")



module.exports.createPermission = function (req, res) {
    const { body } = req;

    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }

    //Check if this user is OWNER of this note
    let insertobj = {
        id: Operations.generateId(),
        noteId: req.params.noteId,
        userId: body.userId,
        permission: body.permission
    }
    sql.query('INSERT INTO note_permissions SET ?', insertobj, function (err1, result) {
        if (err1) {
            return res.status(500).json({
                status: false,
                error: err1,
                message: "Database Error"
            })
        } else {
            return res.status(200).json({
                auth: true,
                message: " Added permission successfully.",
                data: insertobj
            })
            // const notePermisson = {
            //     id: Operations.generateId(),
            //     noteId: insertobj.id,
            //     userId: req["user_info"].id,
            //     permission: "OWNER"
            // }
            // sql.query('INSERT INTO note_permissions SET ?', notePermisson, function (err1, result) {
            //     if (err1) {
            //         return res.status(500).json({
            //             status: false,
            //             error: err1,
            //             message: "Database Error"
            //         })
            //     } else {
            //         return res.status(200).json({
            //             auth: true,
            //             data: insertobj,
            //             message: " Added note successfully.",
            //         })
            //     }
            // })
        }
    })
}



module.exports.fetchUsersForNote = function (req, res) {
    const { body } = req;
    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }
    sql.query(`SELECT users.id, users.fullName, no.permission, no.noteId, no.id permissionId FROM users LEFT JOIN  note_permissions no ON no.userId = users.id AND noteId="${req.params.noteId}"`, function (err1, result) {
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

module.exports.deletePermission = function (req, res) {
    const { body } = req;
    
    if(!req["user_info"].isUser) {
        return res.status(401).json({
            status: false,
            // error: err1,
            message: "Unauthorized action"
        })
    }
    //Check if this user is OWNER of this note

    sql.query(`DELETE FROM note_permissions WHERE id = '${req.params.permissionId}'`, function (err1, result) {
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
