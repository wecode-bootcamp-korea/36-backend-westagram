const likesDao = require('../models/likesDao')

const likeList = async (user_id, post_id) => {
    const postLike = await likesDao.postLike(user_id, post_id);
        return postLike}

module.exports={likeList}