const { database } = require('./database');

const createUser = (name, email, profile_image, password) => {
    try {
        return database.query(`
        INSERT INTO users(
            name, 
            email, 
            profile_image, 
            password
        ) VALUES (?, ?, ?, ?)`, 
        [name, email, profile_image, password]
    ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const lookupUser = () => {
    return database.query(`
        SELECT 
            id, 
            name, 
            email, 
            profile_image, 
            password, 
            created_at, 
            updated_at 
        FROM users`
    )
};

const loginUser = (email) => {
    return database.query(`
        SELECT 
            password
        FROM users
        WHERE email = '${email}'`
    )
}

module.exports = {
    createUser, lookupUser, loginUser
}