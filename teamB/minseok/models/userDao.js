const myDataSource = require('./myDataSource');

const createUser = async (name, birth, contact, password) => {
	try {
		return await myDataSource.query(
		`INSERT INTO users_table(
			name,
			birth,
			contact,
			password,
		) VALUES (?, ?, ?, ?); 
		`,
		[name, birth, contact, password]
	  );} 
	  	catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const createUserList = async (userId) => {
	try{
		return await myDataSource.query(
			`SELECT 
				p.userProfileImage, 
				p.content As postingContent,
				p.postingImageUrl,
				u.id As userId,
				p.id As postingId,
				p.title 
			from posts p
			inner join users_table u on p.user_id = u.id
			where user_id = ${userId}`,)}
	catch{const error = new Error('INVALID_DATA_INPUT');
	error.statusCode = 500;
	throw error;}
}


module.exports = {createUser, createUserList}