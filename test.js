const jwt= require("jsonwebtoken");
const jwtDecode = require("jwt-decode")

const toke = jwt.sign({ id: "7bed0613-7e2e-4a80-a6df-b312e8373b22"}, "super", {
    expiresIn: 86400
})

console.log(toke)

console.log(jwtDecode(toke))