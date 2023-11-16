const request = require("supertest");
const app = require("../app");
const {signToken} = require("../helpers/jwt");
const {sequelize} = require("../models");
let pwd = "$2b$10$957gfiyEpJh5LR5aMl/FT.Av3Gdq4HVdfY.KmXeNTGZ1zKd6VrvIW";
let access_token;
beforeAll(async () => {
	await sequelize.queryInterface.bulkInsert(
		"Users",
		[
			{
				username: "test",
				password: pwd,
				email: "chris252@mail.com",

				createdAt: "2023-11-10",
				updatedAt: "2023-11-10",
			},
		],
		{}
	);

	const payload = {
		userId: 1,
		username: "test",
		email: "chris252@mail.com",
	};

	access_token = signToken(payload);
});

afterAll(async () => {
	await sequelize.queryInterface.bulkDelete("Users", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});

describe("GET /searchRecipe", () => {
	describe("GET /searchRecipe - Succeed", () => {
		it("should return an object", async () => {
			const response = await request(app)
				.get("/recipe")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("GET /searchRecipe - Errors", () => {
		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const response = await request(app)
				.get("/recipe")
				.set("ssss", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid Token", async () => {
			const response = await request(app)
				.get("/recipe")
				.set("Authorization", `Bearer asdasdasd`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid Token empty data", async () => {
			const payload2 = {};

			access_token = signToken(payload2);

			const response = await request(app)
				.get("/recipe")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message User Not Found", async () => {
			const payload2 = {
				userId: 12,
				username: "test",
				email: "chris25@mail.com",
			};

			access_token = signToken(payload2);

			const response = await request(app)
				.get("/recipe")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
