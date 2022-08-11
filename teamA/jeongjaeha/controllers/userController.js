const userService = require('../services/userServices');

const signUp = async (req, res) => {
  try {
    const { user_id, password, name, age } = req.body;

    if ( !user_id || !password || !name || !age ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( user_id, password, name, age );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
	signUp
}