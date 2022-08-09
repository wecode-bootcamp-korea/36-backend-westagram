const likeDao = require('../models/likeDao')

const lookup = async () => {
    const lookupLike = await likeDao.lookupLike()
    return lookupLike;
};

const heart = async (user_id, post_id) => {
    const makeheart = await likeDao.makeheart(user_id, post_id)
    return makeheart;
};


module.exports = {
    lookup, heart
}