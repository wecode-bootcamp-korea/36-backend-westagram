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
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

const updatePost = async (  no, id, post  ) => {
	try {
		return await myDataSource.query(
            `UPDATE posts 
            SET post = ? 
            WHERE 
            posts.user_id = ${id}
            AND  posts.no = ${no} 
            `, [ post ]
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

module.exports = {
	updatePost
}