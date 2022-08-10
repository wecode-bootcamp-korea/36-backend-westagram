//models/userDao.js

const { database } = require("./dataSource");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await database.query(
      `INSERT INTO users(
			name,
			email,
			password,
			profile_image
		) VALUES (?, ?, ?, ?);
		`,

      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const existUser = async (email) => {
  try {
    const count = await database.query(
      `SELECT count(*) FROM users WHERE email=?`,
      [email]
    );
    console.log(count);
    return count;
  } catch (err) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }
};

// 암호화된 비번
const validPwd = async (email) => {
  try {
    return await database.query(
      `SELECT 
		 users.password
	   FROM users
	   WHERE
	   email = ?`,
      [email]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { createUser, existUser, validPwd };
