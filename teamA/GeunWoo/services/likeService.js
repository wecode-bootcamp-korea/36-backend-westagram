const likeDao = require('../models/likeDao');

const createLikes = async (user_id, post_id) => {
    const createLikes = await likeDao.createLikes(
        user_id,
        post_id
    );

    const getLikesByUserId = await likeDao.getLikesByUserId(user_id, post_id);

    if (getLikesByUserId) {
        const err = new Error('CANNOT_LIKE_SAME_POST');
        err.statusCode = 409;
        throw err;
    }    

    return createLikes;
};

module.exports = {
    createLikes
}