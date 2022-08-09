const { dataSource } = require('./daoUtil');

const createUser = async ( name, email, password, profileImage) => {
    try{
        return await dataSource.query(
            `INSERT INTO users (
                name,
                email,
                password,
                profile_image
            ) VALUES (?, ?, ?, ?);`,
            [name, email, password, profileImage]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

const search = async () => {
    try {
        return await dataSource.query(`
        SELECT
            u.id,
            u.name,
            u.email,
            u.profile_image,
            u.created_at
        FROM users u 
        `);
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createUser,
    search
}