const userService = require('../services/userService');

const signUp = (req, res) => {
  try {
    const { email, password} = req.body;
    if ( !email || !password ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    const pwValidation = new RegExp(
      // '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
      '^[a-zA-Z0-9]{4,10}$'
    );
    const emailValidation = new RegExp(
      '^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$'
    );
    if (!pwValidation.test(password)) {
      return res.status(400).json({ message:"PASSWORD_IS_NOT_VALID" });
    }
    if(!emailValidation.test(email)){
      return res.status(400).json({ message:"EMAIL_IS_NOT_VALID" });
    }

    userService.signUp( email, password );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
	signUp
}