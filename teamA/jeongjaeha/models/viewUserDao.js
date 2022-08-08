const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize( )
  .then(() => {

  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

const viewUser = async ( id ) => {
	try {
		return await myDataSource.query(
      `
      SELECT users.id as id, users.no as no, 
      ((SELECT JSON_ARRAYAGG(
        JSON_OBJECT('no', no, 'title', title, 'post', post )) 
          FROM posts WHERE posts.user_id=${ id })) 
        AS post FROM users 
        WHERE users.no=${ id }
      `,  
      
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

module.exports = {
	viewUser
}



