const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPass = (value) => bcrypt.hashSync(value, salt);

const comparePass = (input, hashed) => bcrypt.compareSync(input, hashed);

module.exports = {
	hashPass,
	comparePass,
};
