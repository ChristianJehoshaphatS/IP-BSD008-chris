const errorHandler = (error, req, res, next) => {
	let code = 500;
	let message = "Internal Server Error";
	let errors;
	console.log(error);

	if (error.stack) {
		code = 400;
		message = "Validation Error";
	}

	if (error.name == "SequelizeValidationError") {
		code = 400;
		message = "Validation Error";
		errors = error.errors.map((el) => el.message);
	}
	if (error.name == "SequelizeUniqueConstraintError") {
		code = 400;
		message = "Unique Constraint Error";
	}

	if (error.message == "Invalid email/password") {
		code = 401;
		message = "Invalid email/password";
	}
	if (error.message == "emptyLogin") {
		code = 401;
		message = "Email or Password is empty";
	}
	if (error.message == "Invalid Token") {
		code = 401;
		message = "Invalid Token";
	}
	if (error.name == "JsonWebTokenError") {
		code = 401;
		message = "Invalid Token";
	}

	if (error.message == "Unauthorized") {
		code = 403;
		message = "No Access";
	}

	if (error.message == "User Not Found") {
		code = 404;
		message = "User Not Found";
	}

	res.status(code).json({message, errors});
};

module.exports = errorHandler;
