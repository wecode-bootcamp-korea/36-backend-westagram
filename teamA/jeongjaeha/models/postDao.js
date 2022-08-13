
const { Database } = require("./Database.js");

const posting = async ( userId, title, post ) => {
	try {
		return await Database.query(
				`INSERT INTO posts(
					user_id,
					title,
					post
				) VALUES (?, ?, ?)
				`, [ userId, title, post ]
			);
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

const viewAll = async ( ) => {
	try {
		return await Database.query(
      `SELECT 
			id,
			title,
			post
        FROM posts`,
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}


const viewUser = async ( userId ) => {
	try {
		return await Database.query(
      `
      SELECT posts
				FROM (
					SELECT json_object(
						'id', u.id,
							'email', u.email,
							'posting', json_arrayagg(json_object(
							'title', p.title,
							'post', p.post)
								)
					) posts   
						FROM users u
						INNER JOIN posts p on u.id = p.user_id
						WHERE u.id = ${userId} GROUP BY u.id, u.name) sub;

      `,  
      
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}


const postUpdate = async (  id, title, post  ) => {
	try {
		return await Database.query(
      `UPDATE posts 
      SET 
      title = ?, 
      post = ? 
      WHERE 
      posts.id = ${id}
      `, [ title, post ]
    );

	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

const postDelete = async (  postId, userId  ) => {
	try {
		return await Database.query(
          `DELETE FROM posts
          WHERE posts.id = ${postId} AND posts.user_id = ${userId}
          `,
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

const postLike = async ( postId, userId ) => {
	try {
		return await Database.query(
		`INSERT INTO likes (
      post_id,
      userId
        ) VALUES (?, ?);
		`,
		[ postId, userId ]
	);
	} catch (err) {
		const error = new Error('ALREADY_LIKE_POST');
		error.statusCode = 500;
		throw error;
	}
};

const checkPostExist = async ( id ) => {
	try {
		const post = await Database.query(
		`
			SELECT * FROM posts 
			WHERE EXISTS 
			(SELECT p.id, p.user_id, p.title, p.post FROM posts p WHERE posts.id = ${id})
		`,
	);
		console.log(post)
		return post
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
	posting,
	postDelete,
	postLike,
	postUpdate,
	viewUser,
	viewAll,
	checkPostExist
}