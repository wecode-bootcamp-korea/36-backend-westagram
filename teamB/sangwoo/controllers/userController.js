const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profile_image } = req.body;

    if ( !name || !email || !password || !profile_image ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email, password, profile_image );

    res.status(201).json({message: 'USER_CREATED'});
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 400)
      .json({ message: err.message });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const accessToken = await userService.signIn(email, password);
    
    res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 401)
      .json({ message: err.message });
  }
};

module.exports = {
	signUp,
  signIn
}