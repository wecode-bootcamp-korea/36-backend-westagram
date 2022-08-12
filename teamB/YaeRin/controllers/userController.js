const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, password, profileImage);

    res.status(201).json({ message: "User Created!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const jwtToken = await userService.logIn(email, password);

    res.status(201).json({ jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userPostList = async (req, res) => {
  try {
    const { name, title, content } = req.body;
    const { userId } = req.params;

    const resultUsersPosts = await userService.userPostList(userId, name, title, content);

    let postings = [];
    let data = {
      id: resultUsersPosts[0].id,
      name: resultUsersPosts[0].name,
      postings,
    };

    for (let i of resultUsersPosts) {
      postings.push({
        title: i.title,
        content: i.content,
      });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
  userPostList,
};
