const {User, Company, Job} = require("../models");
const authorization = async (req, res, next) => {
	try {
		const currentUser = await User.findByPk(req.loginInfo.id);
		if (!currentUser) {
			throw new Error("User Not Found");
		}
		if (currentUser.role !== "admin") {
			throw new Error("Unauthorized");
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authorization;
