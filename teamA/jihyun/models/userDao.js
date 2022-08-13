//models/userDao.js

const { database } = require("./dataSource");

const createUser = async (email, password) => {
  try {
    await database.query(
      `INSERT INTO users(
			  email,
			  password
		 ) VALUES (?, ?)`,

      [email, password]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const existUser = async (email) => {
  try {
    return await database.query(
      `SELECT 
        count(*) 
       FROM users 
       WHERE email=?`,

      [email]
    );
  } catch (err) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  const [user] = await database.query(
    `SELECT *
     FROM users
     WHERE email = ?`,
    [email]
  );

  return user;
};

const getUserByuserId = async (userId) => {
  const [user] = await database.query(
    `SELECT *
     FROM users
     WHERE id = ?`,
    [userId]
  );

  return user;
};

const validPwd = async (email) => {
  try {
    return await database.query(
     `SELECT 
		  users.password
	    FROM users
	    WHERE email = ?`,
      [email]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { createUser, existUser, validPwd, getUserByEmail, getUserByuserId };
