const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {

  })
  .catch((err) => {

	  myDataSource.destroy();
  });

const likePost = async ( no, id ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO likes (
        user_id, 
        post_id
        ) VALUES (?, ?);
		`,
		[ no, id ]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  likePost
}