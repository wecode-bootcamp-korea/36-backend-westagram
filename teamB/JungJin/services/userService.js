const userDao = require('../models/userDao')

const signup = async (name, email, profile_image, password) => {
    if(!email.includes('@')) {
        const err = new Error('EMAIL_INVALID')
        err.statusCode = 400
        throw err
    }
    if(password.length < 4) {
        const err = new Error('PASSWORD_INVALID')
        err.statusCode = 400
        throw err
    }
    const createUser = await userDao.createUser(name, email, profile_image, password)
    return createUser;
};

const lookup = async () => {
    const lookupUser = await userDao.lookupUser()
    return lookupUser;
};
  
module.exports = {
    signup, lookup
}