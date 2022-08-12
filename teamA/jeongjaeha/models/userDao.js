const { Database } = require("./Database.js");

const checkId = async ( email ) => {
	try {
		const post = await Database.query(
		`
			SELECT EXISTS (SELECT u.id FROM users u WHERE u.id = '${email}')
		`,
  );
		return post
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};


const createUser = async ( email, password, name, age ) => {
	try {
		return await Database
	.query(
		`INSERT INTO users(
			email, 
			password, 
			name, 
			age
		) VALUES (?, ?, ?, ?);
		`,
		[ email, password, name, age ]
	);
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createUser,
	checkId
}