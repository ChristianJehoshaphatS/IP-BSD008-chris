const {verifyToken} = require("../helpers/jwt");
const {User} = require("../models");

const authenticate = async (req, res, next) => {
	try {
		const auth = req.headers.authorization;
		if (!auth) {
			throw new Error("Unauthorized");
		}
		const token = auth.split(" ")[1];
		const data = verifyToken(token);
		console.log(data, "<<<<<<<<<<");
		if (data == null) {
			throw new Error("Invalid Token");
		}
		const verified = await User.findOne({where: {id: data.userId}});
		if (!verified) {
			throw new Error("User Not Found");
		}

		const {id, username} = verified;
		req.loginInfo = {id, username};
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authenticate;
