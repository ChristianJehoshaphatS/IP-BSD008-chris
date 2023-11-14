"use strict";
const {Model} = require("sequelize");
const {hashPass} = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "username cannot be empty"},
					notNull: {msg: "username cannot be null"},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "email cannot be empty"},
					notNull: {msg: "email cannot be null"},
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "password cannot be empty"},
					notNull: {msg: "password cannot be null"},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: (instance) => {
					instance.password = hashPass(instance.password);
				},
			},
		}
	);
	return User;
};
