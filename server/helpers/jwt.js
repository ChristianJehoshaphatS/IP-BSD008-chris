const jwt = require("jsonwebtoken");

const privateKey = "chefapp";

const signToken = (payload) => jwt.sign(payload, privateKey);

const verifyToken = (token) => jwt.verify(token, privateKey);

module.exports = {
	signToken,
	verifyToken,
};
