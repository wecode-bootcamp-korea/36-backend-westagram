const {myDataSource} = require('./dataSource');

const createUsers = async (name, gender, birth, contact, mbti) => {
    try {
        return await myDataSource.query(
            `INSERT INTO users(
                name,
                gender,
                birth,
                contact,
                mbti
            ) VALUES (?, ?, ?, ?, ?);
            `,
            [name, gender, birth, contact, mbti]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createUsers
}