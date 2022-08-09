const likesDao = require('../models/likesDao')

const searchList = async (user_id, post_id) => {
    const postLike = await likesDao.postLike();
        return postLike}

module.exports={searchList}