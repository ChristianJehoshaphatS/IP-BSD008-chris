const jwt = require("jsonwebtoken");

const privateKey = process.env.SECRET_KEY;

const signToken = (payload) => jwt.sign(payload, privateKey);

const verifyToken = (token) => jwt.verify(token, privateKey);

module.exports = {
	signToken,
	verifyToken,
};
