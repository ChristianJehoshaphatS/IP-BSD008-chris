const {default: axios} = require("axios");
const {Favorite, Pocket} = require("../models");

class MainController {
	static async searchRecipe(req, res, next) {
		try {
			const {query} = req.query;
			const response = await axios.get(
				`https://api.api-ninjas.com/v1/recipe?query=${query}`,
				{
					headers: {
						"X-Api-Key": "1LGO8X4hG+Nd0qiovNcYQw==hxg74BywqaAWiBo4",
					},
				}
			);
			res.status(200).json(response.data);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async saveRecipe(req, res, next) {
		try {
			const {title, ingredients, instructions, servings} = req.body;
			const userId = req.loginInfo.id;
			console.log(userId, ">>>>>>>>>>>>>>>>>");
			const saveRecipe = await Favorite.create({
				title,
				ingredients,
				instructions,
				servings,
				userId,
			});
			console.log(saveRecipe);
			res.status(201).json({message: `${title} has been saved to favorites!`});
		} catch (error) {
			next(error);
		}
	}

	static async saveGetPocketCredentials(req, res, next) {
		try {
			const {access, code} = req.body;
			const userId = req.loginInfo.id;
			console.log(userId, ">>>>>>>>>>>>>>>>>");
			const savePocket = await Pocket.create({
				code,
				access,
				userId,
			});
			console.log(savePocket);
			res.status(201).json({message: `Recipe saved to GetPocket!`});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = MainController;
