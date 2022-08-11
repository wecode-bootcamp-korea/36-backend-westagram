const userDao = require('../models/userDao')

const signUp = async (user_id, password, name, age) => {

    const emailIdCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const pwValidation = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    const checkIdDao = await userDao.checkId(user_id)
    resultIdCheck = Number(Object.values(checkIdDao[0])[0])


    if ( !user_id.match(emailIdCheck)) {
        const error = new Error('ID_IS_NOT_VALID');
        error.statusCode = 409;
        throw error;
    } 
    
    if( resultIdCheck === 1) {
        const error = new Error('ID_IS_EXIST')
        error.statusCode = 409;
        throw error;
       }

    if ( !password.match(pwValidation)) {
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