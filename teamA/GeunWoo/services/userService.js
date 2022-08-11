const userDao = require('../models/userDao');
const pwValidation = require('../utils/validator');
const bcrypt = require('bcrypt');

const createUsers = async (name, gender, birth, contact, mbti, email, password) => {
    pwValidation.validatePw(password);
    
    if (typeof(name) != 'string' || 
        typeof(gender) != 'string' || 
        typeof(Number(birth)) != 'number' || 
        typeof(contact) != 'string' || 
        typeof(mbti) != 'string' || 
        typeof(email) != 'string' ||
        typeof(password) != 'string' 
        ) {
        const err = new Error('INVALID INPUTs');
        err.statusCode = 409;
        throw err;
    }

    const saltRounds = 15; 

    const makeHash = async (password, saltRounds) => {
      return await bcrypt.hash(password, saltRounds); 
    }

    const hashedPassword = await makeHash(password, saltRounds); 

    const createUsers = await userDao.createUsers(
        name,
        gender,
        birth,
        contact,
        mbti,
        email,
        hashedPassword
    );
        
    return createUsers;
};

module.exports = {
    createUsers
}