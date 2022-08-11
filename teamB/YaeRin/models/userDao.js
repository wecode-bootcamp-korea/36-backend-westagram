const { myDataSource } = require("./dataSource.js");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await myDataSource.query(`
      INSERT INTO users (
        name,
        email,
        password,
        profile_image
      ) VALUES (?, ?, ?, ?);`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const userLogin = async (email) => {
  try {
    return await myDataSource.query(`
      SELECT *
      FROM users u
      WHERE u.email = ?`,
      [email]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const readUsersPosts = async (id, name, title, content) => {
  try {
    return await myDataSource.query(`
      SELECT
        u.id,
        u.name,
        p.title,
        p.content
      FROM users u
      INNER JOIN posts p
      ON u.id = p.user_id
      WHERE p.user_id = ${id}`,
      [id, name, title, content]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  userLogin,
  readUsersPosts,
};
