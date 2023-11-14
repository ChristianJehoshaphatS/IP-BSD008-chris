"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Favorites", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "title cannot be empty"},
					notNull: {msg: "title cannot be null"},
				},
			},
			ingredients: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "ingredients cannot be empty"},
					notNull: {msg: "ingredients cannot be null"},
				},
			},
			instructions: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "instructions cannot be empty"},
					notNull: {msg: "instructions cannot be null"},
				},
			},
			servings: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {msg: "servings cannot be empty"},
					notNull: {msg: "servings cannot be null"},
				},
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {msg: "user ID cannot be empty"},
					notNull: {msg: "user ID cannot be null"},
				},
				references: {
					model: "Users",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Favorites");
	},
};
