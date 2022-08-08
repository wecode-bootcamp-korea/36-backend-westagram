const userDao = require('../models/userDao')

const signUp = async (user_id, password, name, age) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '[a-zA-Z0-9]'
    );
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
      const createUser = await userDao.createUser(
        user_id, 
        password, 
        name, 
        age
        );
      
        return createUser;
      };

  
  module.exports = {
      signUp
  }