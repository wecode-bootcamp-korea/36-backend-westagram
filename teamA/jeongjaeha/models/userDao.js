const { Database, initialize } = require("./Database.js");

const createUser = async ( user_id, password, name, age ) => {
	try {
		return await Database
	.query(
		`INSERT INTO users(
			id, 
			password, 
			name, 
			age
		) VALUES (?, ?, ?, ?);
		`,
		[ user_id, password, name, age ]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createUser
}