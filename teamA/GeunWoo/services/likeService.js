const likeDao = require('../models/likeDao');

const createLikes = async (user_id, post_id) => {
    const createLikes = await likeDao.createLikes(
        user_id,
        post_id
    );
    
    return createLikes;
};

module.exports = {
    createLikes
}