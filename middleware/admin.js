// admin middleware
// MiddleWare for handling authication with jwt
// const jwt = require("jsonwebtoken");
// const secret = require("../index");
const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic with jwt tokens
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username) {
        next();
    }else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }

}

module.exports = adminMiddleware;
