const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../utils/ConsUtil");

const signUp = async (email, password) => {
  validator.validateEmail(email);
  validator.validatePwd(password);

  const user = await userDao.getUserByEmail(email);

  if (user) {
    const err = new Error("DUPLICATED_EMAIL");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await userDao.createUser(email, hashedPassword);
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const err = new Error("USER_DOES_NOT_EXIST");
    err.statusCode = 404;
    throw err;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    const err = new Error("INVALID PASSWORD");
    err.statusCode = 400;
    throw err;
  }
  
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET); //accessToken
}

module.exports = { signUp, signIn };
