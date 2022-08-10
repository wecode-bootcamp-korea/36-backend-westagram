//controller/userController.js

const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userService.signUp(name, email, hashedPassword, profileImage);
    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userService.signIn(email);
    const hashedPassword = await userService.validPwd(email);

    if (existUser == 1) {
      console.log(hashedPassword);
      const validPwd = await bcrypt.compare(password, Object.values(hashedPassword[0])[0]);
      if (validPwd) {
        return res.status(200).json({
          accessToken: Object.values(hashedPassword[0])[0],
        });
      } else {
        return res.status(400).json({
          message: "Invalid User",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
