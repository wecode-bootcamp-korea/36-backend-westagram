//service/userService.js

const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );

  return createUser;
};

const signIn = async (email) => {
  const existUser = await userDao.existUser(email);

  console.log(existUser);
  return JSON.parse(Object.values(existUser[0]));
};

const validPwd = async (email) => {
  const hashedPassword = await userDao.validPwd(email);
  console.log(`userService.validPassword function ::${hashedPassword}`)

  return hashedPassword;
}

module.exports = { signUp, signIn, validPwd };
