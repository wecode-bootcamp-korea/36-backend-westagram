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

const posting = async (req, res) => {
  try {
    const { user_id, title, post } = req.body;

    if ( !user_id || !title || !post ) {
      return res.status(400).json({ message: 'FAIL_POSTING' });
    }

    await userService.signUp( user_id, title, post );
    return res.status(201).json({
      message: 'POSTING_SUCCESS',
    })
  } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    
  } 
};

  
 


module.exports = {
	signUp,
  posting
}