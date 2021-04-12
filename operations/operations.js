const { v4: uuid } = require('uuid');

function generateId(){
    return uuid();
}

module.exports.Operations = {
    generateId
}