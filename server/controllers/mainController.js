const {default: axios} = require("axios");
const {Favorite, Pocket} = require("../models");

class MainController {
	static async searchRecipe(req, res, next) {
		try {
			console.log(req.query);
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
			next(error);
		}
	}

	static async getRecipe(req, res, next) {
		try {
			const userId = req.loginInfo.id;
			const favoriteRecipes = await Favorite.findAll({where: {userId}});
			res.status(200).json(favoriteRecipes);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async getRecipeDetail(req, res, next) {
		try {
			const {id} = req.params;
			console.log(id, ">>>>>>>>>>");
			const favoriteRecipe = await Favorite.findOne({where: {id}});
			res.status(200).json(favoriteRecipe);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async saveRecipe(req, res, next) {
		try {
			console.log(req.body);
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
			res.status(201).json({message: `${title} has been saved to favorites!`});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async getPocketCode(req, res, next) {
		try {
			const {redirect_uri} = req.body;
			const {data} = await axios.post(
				"https://getpocket.com/v3/oauth/request",
				{
					consumer_key: process.env.GET_POCKET_CONSUMER_KEY,
					redirect_uri,
				},
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async authorizePocket(req, res, next) {
		try {
			const data = {access_token: process.env.POCKET_ACCESS_TOKEN};
			res.status(200).json(data);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async saveGetPocketCredentials(req, res, next) {
		try {
			const {url, title, tags, access_token} = req.body;
			const consumer_key = process.env.GET_POCKET_CONSUMER_KEY;
			const {data} = await axios.post(
				`https://getpocket.com/v3/add?url=${url}&title=${title}&tags=${tags}&consumer_key=${consumer_key}&access_token=${access_token}`
			);
			console.log(data);
			res.status(201).json({message: `Recipe saved to GetPocket!`});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = MainController;
