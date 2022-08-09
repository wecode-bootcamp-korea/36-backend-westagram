const likeDao = require("../models/likeDao");

const like = async(user_id, post_id) => {
    const addlike = await likeDao.addlike(
        user_id,
        post_id
    );

    return addlike;
};

module.exports = {
    like
}