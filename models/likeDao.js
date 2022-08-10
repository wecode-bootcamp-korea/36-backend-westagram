const {myDataSource} = require('./dataSource');

const createLikes = async (user_id, post_id) => {
    try {
        return await myDataSource.query(
            `INSERT INTO likes(
                user_id,
                post_id
            ), VALUES (?, ?);
            `,
            [user_id, post_id]
        );
    } catch (err) {
        const error = new Error('INVALID_IDs');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createLikes
}