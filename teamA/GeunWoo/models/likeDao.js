const {myDataSource} = require('../utils/dataSource')

const createLikes = async (user_id, post_id) => {
    try {
        await myDataSource.query(
                `INSERT INTO likes(
                    user_id,
                    post_id
                ) VALUES (?, ?);
                `,
                [user_id, post_id]
        );
    } catch (err) {
        const error = new Error('INVALID_IDs');
        error.statusCode = 500;
        throw error;
    }
};

const getLikesByUserId = async(user_id, post_id) => {
    try {
        return await myDataSource.query(
                `SELECT
                    user_id,
                    post_id
                FROM likes l
                WHERE l.user_id=?
                AND l.post_id=?
                `,
                [user_id, post_id]
        );
    } catch (err) {
        const error = new Error('INVALID_COMBINATION_OF_IDs');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createLikes,
    getLikesByUserId
} 