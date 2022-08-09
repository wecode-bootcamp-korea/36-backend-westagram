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

module.exports = {
    createUser, lookupUser
}