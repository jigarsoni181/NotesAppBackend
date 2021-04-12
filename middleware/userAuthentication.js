var sql = require('../database.js')
const jwtDecode = require('jwt-decode')

module.exports.identifyUser = function () {
    return function (req, res, next) {
        console.log(req.headers)
        req["user_info"] = {
            isUser : false 
        };
        if (req.headers.authorization) {
            console.log(req.headers.authorization)
            const token = jwtDecode(req.headers.authorization);
            sql.query(`SELECT * from users WHERE id='${token.id}'`, function (_error, _result) {
                if (_error || !_result[0]) {
                    return res.status(200).json({
                        status: false,
                        // error: err1,
                        message: "Unauthorized action 2"
                    })
                } else {
                    console.log('object :>> ', _result[0]);
                    req['user_info'] = _result[0];
                    req["user_info"].isUser = true;
                    next()
                }
            });
        } else {
            return res.status(401).json({
                status: false,
                // error: err1,
                message: "Unauthorized action 2"
            })
        }


    }
}
