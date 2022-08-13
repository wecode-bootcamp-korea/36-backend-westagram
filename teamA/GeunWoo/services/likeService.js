const likeDao = require('../models/likeDao');

const createLikes = async (user_id, post_id) => {
    const getLikesByUserId = await likeDao.getLikesByUserId(user_id, post_id);

    if (getLikesByUserId[0] != null) {
        if (getLikesByUserId[0].user_id == user_id && getLikesByUserId[0].post_id == post_id) {
            const err = new Error('CANNOT_LIKE_SAME_POST');
            err.statusCode = 409;
            throw err;
        }  
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