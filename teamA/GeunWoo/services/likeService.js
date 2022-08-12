const likeDao = require('../models/likeDao');

const createLikes = async (user_id, post_id) => {
    if (typeof(Number(user_id)) != 'number' || typeof(Number(post_id)) != 'number') {
        const err = new Error('INVALID_TYPE');
        err.statusCode = 400;
        throw err;
    }

    const getLikesByUserId = await likeDao.getLikesByUserId(user_id, post_id);
    
    if (getLikesByUserId) {
        const err = new Error('CANNOT_LIKE_SAME_POST');
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