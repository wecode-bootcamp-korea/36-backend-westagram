const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 400;
    throw err;
  }

  const createUser = await userDao.createUser(name, email, password, profileImage);

  return createUser;
};

const usersPostsCtrl = async (id, name, title, content) => {
  const readUsersPosts = await userDao.readUsersPosts(id, name, title, content);
  
  return readUsersPosts;
};

module.exports = {
  signUp,
  usersPostsCtrl,
};
