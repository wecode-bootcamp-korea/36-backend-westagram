const likeDao = require('../models/likeDao');

const addlike = async (postId, userId) => {
    const result = await likeDao.addlike(postId, userId);

    return result;
}

module.exports = { addlike };