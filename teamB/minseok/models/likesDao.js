const myDataSource = require('./myDataSource');

const postLike = async(user_id, post_id) =>{
    try{return await myDataSource.query(
		`INSERT INTO likes(
			user_id,
			post_id
		) VALUES (?, ?);
		`,
		[user_id, post_id]
	);}
    catch (err) {const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;}
}

module.exports ={postLike}