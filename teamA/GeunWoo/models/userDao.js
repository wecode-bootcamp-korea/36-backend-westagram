const {myDataSource} = require('./dataSource');

const createUsers = async (name, gender, birth, contact, mbti, email, password) => {
    try {
        return await myDataSource.query(
            `INSERT INTO users(
                name,
                gender,
                birth,
                contact,
                mbti,
                email,
                password
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
            [name, gender, birth, contact, mbti, email, password]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const data = await myDataSource.query(
                        `SELECT 
                            id,
                            email,
                            password
                        FROM users u
                        WHERE u.email=?
                        `,
                        [email]
        );

        return data;

    } catch (err) {
        const error = new Error('INVALID_EMAIL');
        error.statusCode = 500;
        throw error;
    }
  };
  
module.exports = {
    createUsers, 
    getUserByEmail
}