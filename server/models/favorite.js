"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Favorite extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Favorite.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "title cannot be empty"},
					notNull: {msg: "title cannot be null"},
				},
			},
			ingredients: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "ingredients cannot be empty"},
					notNull: {msg: "ingredients cannot be null"},
				},
			},
			instructions: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "instructions cannot be empty"},
					notNull: {msg: "instructions cannot be null"},
				},
			},
			servings: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "servings cannot be empty"},
					notNull: {msg: "servings cannot be null"},
				},
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {msg: "user ID cannot be empty"},
					notNull: {msg: "user ID cannot be null"},
				},
			},
		},
		{
			sequelize,
			modelName: "Favorite",
		}
	);
	return Favorite;
};
