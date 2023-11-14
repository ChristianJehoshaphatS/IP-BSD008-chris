const {comparePass} = require("../helpers/bcrypt");
const {verifyToken, signToken} = require("../helpers/jwt");
const {User} = require("../models");

class UserController {
	static async register(req, res, next) {
		try {
			const {username, email, password} = req.body;

			const registeredUser = await User.create({
				username,
				email,
				password,
			});
			console.log("halo");
			let output = {
				id: registeredUser.id,
				username: registeredUser.username,
				email: registeredUser.email,
			};

			res.status(201).json({output});
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
		try {
			let token;
			const {email, password} = req.body;
			if (!email || !password) {
				throw new Error("emptyLogin");
			}
			const foundUser = await User.findOne({where: {email}});

			if (!foundUser) {
				throw new Error("Invalid email/password");
			}

			const auth = await comparePass(password, foundUser.password);
			const {id, username} = foundUser;
			const payload = {
				userId: id,
				username,
			};
			if (auth) {
				token = signToken(payload);
			} else {
				throw new Error("Invalid email/password");
			}
			res.status(200).json({access_token: token});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
