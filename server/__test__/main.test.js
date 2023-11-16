const request = require("supertest");
const app = require("../app");
const {signToken} = require("../helpers/jwt");
const {sequelize} = require("../models");
let pwd = "$2b$10$957gfiyEpJh5LR5aMl/FT.Av3Gdq4HVdfY.KmXeNTGZ1zKd6VrvIW";
let access_token;
beforeAll(async () => {
	try {
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

		await sequelize.queryInterface.bulkInsert(
			"Favorites",
			[
				{
					title: "test",
					ingredients: "123",
					instructions: "chris252@mail.com",
					servings: "chris252@mail.com",
					userId: 1,

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
	} catch (error) {
		console.log(error);
	}
});

afterAll(async () => {
	await sequelize.queryInterface.bulkDelete("Users", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});

	await sequelize.queryInterface.bulkDelete("Favorites", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});

describe("POST /favorite", () => {
	describe("POST /favorite - Succeed", () => {
		it("should return an object", async () => {
			const body = {
				title: "Mushroom Soup",
				ingredients: "2 Tea Spoon of Salt, Mushroom",
				instructions: "Pour Salt",
				servings: "10",
				userId: 1,
			};
			const response = await request(app)
				.post("/favorite")
				.send(body)
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("POST /favorite - Errors", () => {
		it("should return an object with an Error message Validation Error", async () => {
			const body = {
				title: "",
				ingredients: "2 Tea Spoon of Salt, Mushroom",
				instructions: "Pour Salt",
				servings: "10",
				userId: 1,
			};
			const response = await request(app)
				.post("/favorite")
				.send(body)
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
		});

		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const body = {
				title: "Mushroom Soup",
				ingredients: "2 Tea Spoon of Salt, Mushroom",
				instructions: "Pour Salt",
				servings: "10",
				userId: 1,
			};
			const response = await request(app)
				.post("/favorite")
				.send(body)
				.set("ssss", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid Token empty data", async () => {
			const payload2 = {};

			const body = {
				title: "Mushroom Soup",
				ingredients: "2 Tea Spoon of Salt, Mushroom",
				instructions: "Pour Salt",
				servings: "10",
				userId: 1,
			};

			let access_token2 = signToken(payload2);

			const response = await request(app)
				.post("/favorite")
				.send(body)
				.set("Authorization", `Bearer ${access_token2}`);

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

			let access_token2 = signToken(payload2);

			const response = await request(app)
				.post("/favorite")
				.set("Authorization", `Bearer ${access_token2}`);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("GET /favorite", () => {
	describe("GET /favorite - Succeed", () => {
		it("should return an object", async () => {
			const response = await request(app)
				.get("/favorite")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("GET /favorite - Errors", () => {
		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const response = await request(app)
				.get("/favorite")
				.set("sss", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid Token empty data", async () => {
			const payload2 = {};

			let access_token2 = signToken(payload2);

			const response = await request(app)
				.get("/favorite")
				.set("Authorization", `Bearer ${access_token2}`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("GET /favorite/:id", () => {
	describe("GET /favorite/:id - Succeed", () => {
		it("should return an object", async () => {
			const response = await request(app)
				.get("/favorite/1")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("GET /favorite/:id - Errors", () => {
		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const response = await request(app)
				.get("/favorite/1")
				.set("sss", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid Token empty data", async () => {
			const payload2 = {};

			let access_token2 = signToken(payload2);

			const response = await request(app)
				.get("/favorite/1")
				.set("Authorization", `Bearer ${access_token2}`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Recipe Not Found", async () => {
			const response = await request(app)
				.get("/favorite/50")
				.set("Authorization", `Bearer ${access_token}`);
			console.log(response.body);
			expect(response.status).toBe(200);
			expect(response.body).toBe(null);
		});
	});
});

describe("POST /getPocketCode", () => {
	describe("POST /getPocketCode - Succeed", () => {
		it("should return an object", async () => {
			const body = {
				redirect_uri: "http://localhost:3000",
			};
			const response = await request(app)
				.post("/pocketCode")
				.send(body)
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(200);
			expect.any(String);
		});
	});

	describe("POST /favorite - Errors", () => {
		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const body = {
				redirect_uri: "http://localhost:3000",
			};
			const response = await request(app)
				.post("/pocketCode")
				.send(body)
				.set("sdsd", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
		});
	});
});

describe("POST /pocketAuthorize", () => {
	describe("POST /pocketAuthorize - Succeed", () => {
		it("should return an object", async () => {
			const response = await request(app)
				.post("/pocketAuthorize")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(200);
			expect.any(String);
		});
	});

	describe("POST /favorite - Errors", () => {
		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const response = await request(app)
				.post("/pocketAuthorize")
				.set("asd", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
		});
	});
});

describe("POST /pocket", () => {
	describe("POST /pocket - Succeed", () => {
		it("should return an object", async () => {
			const body = {
				url: "https://w4zf1p6s-5173.asse.devtunnels.ms/detail/5",
				title: "Chicken Soup",
				tags: "recipe",
				access_token: "9a08b576-5f3a-40ba-2e8a-35c486",
			};
			const response = await request(app)
				.post("/pocket")
				.send(body)
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("POST /pocket - Errors", () => {
		it("should return an object with an Error message Unauthorized - empty headers", async () => {
			const body = {
				code: "12345678910",
				access: "GEC-129361-129612",
			};
			const response = await request(app)
				.post("/pocket")
				.send(body)
				.set("ssss", `Bearer ${access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid Token empty data", async () => {
			const payload2 = {};

			const body = {
				code: "12345678910",
				access: "GEC-129361-129612",
			};

			access_token = signToken(payload2);

			const response = await request(app)
				.post("/pocket")
				.send(body)
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message User Not Found", async () => {
			const payload2 = {
				userId: 12,
				username: "test",
				email: "chris22@mail.com",
			};

			access_token = signToken(payload2);

			const response = await request(app)
				.post("/pocket")
				.set("Authorization", `Bearer ${access_token}`);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
