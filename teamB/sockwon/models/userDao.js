const appDataSource = require('./dataSource');
const bcrypt = require('../middleware/bcypt');

const createUser =  async ( email, password) => {
	const cryptedPassword =  await bcrypt.makeHash(password, 12);
	try {
		return appDataSource.query(
		`INSERT INTO users(
			email,
			password
		) VALUES (?, ?)
		`,
		[ email, cryptedPassword ]
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