const { dataSource, intialization } = require('../util/daoUtil');

intialization;

const addlike = async(postId, userId) => {
    try {
        return await dataSource.query(
            `INSERT INTO likes (
                post_id,
                user_id
            ) VALUES (${postId}, ${userId})`);
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    addlike
};