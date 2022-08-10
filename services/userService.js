const userDao = require('../models/userDao');

const createUsers = async (name, gender, birth, contact, mbti) => {
    if (typeof(name) != 'string' || typeof(gender) != 'string' || typeof(birth) != 'number' || typeof(contact) != 'string' || typeof(mbti) != 'string') {
        const err = new Error('INVALID INPUTs');
        err.statusCode = 409;
        throw err;
    }

    const createUsers = await userDao.createUsers(
        name,
        gender,
        birth,
        contact,
        mbti
    );
        
    return createUsers;
};

module.exports = {
    createUsers
}