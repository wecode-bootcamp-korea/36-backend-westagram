const likeDao = require('../models/likeDao');

const createLikes = async (user_id, post_id) => {
    if (typeof(Number(user_id)) != 'number' || typeof(Number(post_id)) != 'number' || user_id == 0 || post_id == 0) {
        const err = new Error('INVALID IDs');
        err.statusCode = 409;
        throw err;
    }

    const createLikes = await likeDao.createLikes(
        user_id,
        post_id
    );

    return createLikes;
};

module.exports = {
    createLikes
}