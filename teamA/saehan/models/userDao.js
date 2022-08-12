const { dataSource } = require("../utils/daoUtil");

const emailDuplicate = async (email) => {
    try{
        return await dataSource.query(
            `SELECT EXISTS(
                SELECT * 
                FROM users 
                WHERE email="${email}");
        `);
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const getUserByEmail = async(email) => {
        const [user] = await dataSource.query(
            `SELECT *
            FROM users
            WHERE email = "${email}";
            `);
    return user;
};

const createUser = async (name, email, password) => {
    try {
        return await dataSource.query(
            `INSERT INTO users(
                name,
                email,
                password
            ) VALUES (?, ?, ?);
            `,
            [name, email, password]
        );
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const showPosts = async (userId) => {
    try{
        const data = await dataSource.query(
            `SELECT
                    p.id as postingId,
                    p.title,
                    p.content,
                    p.user_id
            FROM posts p
            WHERE p.user_id = ${userId};
            `);
            let obj = {
                Id: parseInt(userId)
            };
            obj["postings"] = data;
        return obj;
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createUser,
    showPosts,
    emailDuplicate,
    getUserByEmail
}
