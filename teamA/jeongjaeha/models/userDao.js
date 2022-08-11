const { Database } = require("./Database.js");

const checkId = async ( user_id ) => {
	try {
		const post = await Database.query(
		`
			SELECT EXISTS (SELECT u.id FROM users u WHERE u.id = '${user_id}')
		`,
	  );
		return post
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};


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
  createUser,
	checkId
}