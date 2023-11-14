const {comparePass} = require("../helpers/bcrypt");
const {verifyToken, signToken} = require("../helpers/jwt");
const {User} = require("../models");
const {OAuth2Client} = require("google-auth-library");

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

	static async Googlelogin(req, res, next) {
		try {
			console.log("halo");
			const {token} = req.headers;
			const client = new OAuth2Client();

			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
				// Or, if multiple clients access the backend:
				//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
			});
			const payload = ticket.getPayload(); //dapatkan info dari email kita
			const userid = payload["sub"];
			// If request specified a G Suite domain:
			// const domain = payload['hd'];

			//FIND OR CREATE sequelize
			const [user, created] = await User.findOrCreate({
				where: {
					email: payload.email,
				},
				defaults: {
					email: payload.email,
					password: "password_google",
					username: "google_user",
				},
				hooks: false,
			});

			const access_token = signToken({email: user.email});
			res.status(200).json(access_token);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
