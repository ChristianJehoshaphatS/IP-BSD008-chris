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
		role: "admin",
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

// .send untuk ngirim body
// .set untuk ngeset headers
describe("POST /login", () => {
	describe("POST /login - Succeed", () => {
		it("should return an object with message", async () => {
			const body = {
				email: "chris252@mail.com",
				password: "12345",
			};

			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("access_token", expect.any(String));
		});
	});

	describe("POST /login - Errors", () => {
		it("should return an object with an Error message Empty email/password", async () => {
			const body = {
				email: null,
				password: "12345",
			};

			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Empty email/password", async () => {
			const body = {
				email: "chris252@mail.com",
				password: null,
			};

			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid email/password", async () => {
			const body = {
				email: "halo@mail.com",
				password: "12345",
			};

			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});

		it("should return an object with an Error message Invalid email/password", async () => {
			const body = {
				email: "chris252@mail.com",
				password: "09876",
			};

			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
//test login

//test register
describe("POST /register", () => {
	describe("POST /register - Succeed", () => {
		it("should be return an object with message", async () => {
			const body = {
				username: "test",
				password: "123456789",
				email: "chris20252@mail.com",
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("output", expect.any(Object));
		});
	});

	describe("POST /register - error", () => {
		it("should be return an object with an Error message Sequelize Database Error email null", async () => {
			const body = {
				username: "test",
				password: "123456789",
				email: null,
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "Validation Error");
		});

		it("should be return an object with an Error message Validation Error password null", async () => {
			const body = {
				username: "test",
				password: null,
				email: "chris20252@mail.com",
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "Validation Error");
		});

		it("should be return an object with an Error message  Validation Error email notEmpty", async () => {
			const body = {
				username: "test",
				password: "123456789",
				email: "",
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "Validation Error");
			expect(response.body).toHaveProperty("errors", expect.any(Array));
		});

		it("should be return an object with an Error message Validation Error Password notEmpty", async () => {
			const body = {
				username: "test",
				password: "",
				email: "chris20252@mail.com",
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "Validation Error");
			expect(response.body).toHaveProperty("errors", expect.any(Array));
		});

		it("should be return an object with an Error message Unique Constraint email", async () => {
			const body = {
				username: "test",
				password: "123456789",
				email: "chris252@mail.com",
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty(
				"message",
				"Unique Constraint Error"
			);
		});

		it("should be return an object with an Error message must be an email", async () => {
			const body = {
				username: "test",
				password: "123456789",
				email: "chris252000",
			};
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "Validation Error");
			expect(response.body).toHaveProperty("errors", expect.any(Array));
		});
	});
});
