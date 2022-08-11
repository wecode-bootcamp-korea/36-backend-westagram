const { dataSource } = require("../utils/daoUtil");

const addlike = async(user_id, post_id) => {
    try{
        await dataSource.query(
            `INSERT INTO likes(
                user_id,
                post_id
        ) VALUES (?, ?);
        `, [user_id, post_id]);
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

module.exports = {
    addlike
}