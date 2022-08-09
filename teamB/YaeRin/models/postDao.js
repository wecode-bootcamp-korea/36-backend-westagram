const { myDataSource } = require("./dataSource.js");

const createPost = async (title, content, userId) => {
  try {
    return await myDataSource.query(`
      INSERT INTO posts (
        title,
        content,
        user_id
      ) VALUES (?, ?, ?);`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const readPost = async (title, content, userId) => {
  try {
    return await myDataSource.query(`
      SELECT *
      FROM posts`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const editPost = async (title, content, postId) => {
  try {
    await myDataSource.query(`
      UPDATE posts 
      SET 
        title = ?, 
        content = ? 
      WHERE 
        posts.id = ${postId}`,
      [title, content]
    );

    return await myDataSource.query(`
      SELECT 
        posts.user_id AS userId,
        users.name AS userName,
        posts.id AS postId,
        posts.title AS postTitle,
        posts.content AS postContent
      FROM posts
      INNER JOIN users
      ON (posts.user_id = users.id AND posts.id = ${postId})`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    return await myDataSource.query(`
      DELETE FROM posts 
      WHERE posts.id = ${postId}`,
      [postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const likePost = async (postId, userId) => {
  try {
    return await myDataSource.query(`
      INSERT INTO likes (
        user_id, 
        post_id
      ) VALUES (?, ?);`,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  readPost,
  editPost,
  deletePost,
  likePost,
};

