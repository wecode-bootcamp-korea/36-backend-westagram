
const { Database, initialize } = require("./Database.js");

const posting = async ( user_id, title, post ) => {
	try {
		return await Database.query(
			    `INSERT INTO posts(
			      user_id,
			      title,
			      post
			    ) VALUES (?, ?, ?)
			    `, [ user_id, title, post ]
			  )
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
       user_id,
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


const viewUser = async ( id ) => {
	try {
		return await Database.query(
      `
      SELECT posts
				FROM (
					SELECT json_object(
						'no', u.no,
							'id', u.id,
							'posting', json_arrayagg(json_object(
							'title', p.title,
							'post', p.post)
								)
					) posts   
						FROM users u
						INNER JOIN posts p on u.no = p.user_id
						WHERE u.no = ${id} GROUP BY u.no, u.name) sub;

      `,  
      
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}


const postUpdate = async (  no, title, post  ) => {
	console.log(title);
	try {
		return await Database.query(
      `UPDATE posts 
      SET 
      title = ?, 
      post = ? 
      WHERE 
      posts.no = ${no}
      `, [ title, post ]
    );

	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

const postDelete = async (  no, id  ) => {
	try {
		return await Database.query(
          `DELETE FROM posts
          WHERE posts.no = ${no} AND posts.user_id = ${id}
          `,
    )
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}		
}

const postLike = async (  no, id) => {
	try {
		return await Database.query(
		`INSERT INTO likes (
      post_id,
      user_id 
        ) VALUES (?, ?);
		`,
		[ no, id ]
	  );
	} catch (err) {
		const error = new Error('ALREADY_LIKE_POST');
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
	viewAll
}