const userDao = require("../models/userDao");
const { emailValidation } = require("../utils/emailValidation");
const { pwValidaiton } = require("../utils/pwValidation");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (name, email, password, profileImage) => {
  pwValidaiton(password);
  emailValidation(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const createUser = await userDao.createUser(name, email, hashedPassword, profileImage);

  return createUser;
};

const login = async (email, password) => {
  const user = await userDao.userLogin(email);

  const result = await bcrypt.compare(password, user[0].password);

  if (!result) {
    const err = new Error("INVALID_PASSWORD");
    err.statusCode = 401;
    throw err;
  }
  return jwt.sign({ email }, process.env.JWT_SECRET);
};

const userPostList = async (id, name, title, content) => {
  const readUsersPosts = await userDao.readUsersPosts(id, name, title, content);
  return readUsersPosts;
};

module.exports = {
  signUp,
  login,
  userPostList,
};
