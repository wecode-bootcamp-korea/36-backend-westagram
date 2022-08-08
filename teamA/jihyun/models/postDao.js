//models/postDao.js

const { DataSource } = require("typeorm");

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

database.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    database.destroy();
  });

const createPost = async (userId, title, content) => {
  try {
    return await database.query(
      `INSERT INTO posts (
            user_id,
            title, 
            content
            ) VALUES (?, ?, ?)`,

      [userId, title, content]
    );
  } catch (err) {
    const error = new Error("TITLE_OR_CONTENT_EMPTY");
    error.statusCode = 400;
    throw error;
  }
};

const getPostList = async () => {
  try {
    return await database.query(
      `SELECT 
            u.id as "userId", 
            u.name as "userName", 
            p.id as "postingId", 
            p.title as "postingTitle", 
            p.content as "postingContent" 
        FROM posts p 
        INNER JOIN users u ON p.user_id = u.id order by p.id`
    );
  } catch (err) {
    const error = new Error("POST_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }
};

const getUserPost = async (userId) => {
  try {
    return await database.query(
      `SELECT postslist
        FROM (
          SELECT json_object(
            'id', u.id,
                'name', u.name,
                'posting', json_arrayagg(json_object(
                    'title', p.title,
                    'content', p.content)
                    )
             ) postslist      
               FROM users u
               INNER JOIN posts p on u.id = p.user_id
               WHERE u.id = ${userId}
               GROUP BY u.id, u.name) sub`,
    );
  } catch (err) {
    const error = new Error("POST_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }
};

const patchPost = async (postId, postingContent) => {
  try {
    return await database.query(
    `UPDATE
      posts 
    SET 
      content = ?
    WHERE id = ${postId}`,

    [ postingContent ]
    );

  } catch (err) {
    const error = new Error("POST_UPDATE_FAIL");
    error.statusCode = 400;
    throw error;
  }
}

const deletePost = async (postId) => {
  try {
    return await database.query(
    `DELETE
     FROM posts
     WHERE id = ${postId}`,
    );
  } catch (err) {
    const error = new Error("POST_DELETE_FAIL");
    error.statusCode = 400;
    throw error;
  }
}

const likePost = async (userId, postId) => {
  try {
    return await database.query(
    `INSERT INTO likes (
      user_id, 
      post_id
    ) VALUES (?, ?)`,

    [userId, postId]
    );
  } catch (err) {
    const error = new Error("USER_OR_POST_DOES_NOT_EXIST");
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { createPost, getPostList, getUserPost, patchPost, deletePost, likePost };
