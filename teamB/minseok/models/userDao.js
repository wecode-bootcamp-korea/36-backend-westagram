const myDataSource = require('./myDataSource');


const getUser = async (name) => {
	const [user] = await myDataSource.query(
	  `	SELECT *
		FROM users_table u
		WHERE u.name = ? 
	  `,
	  [name]
	  );
	return user;
  };

const createUser = async (name, birth, contact, password) => {
	try {console.log(typeof(password))
		return await myDataSource.query(
		`INSERT INTO users_table(
			name,
			birth,
			contact,
			password
			) VALUES (?, ?, ?, ?); `,
		[name, birth, contact, password]
		)} 
	catch (err) {
	const error = new Error('INVALID_DATA_INPUT');
	error.statusCode = 500;
	throw error;}
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


module.exports = {getUser, createUser, createUserList}