const likeDao = require("../models/likeDao");

const like = async(user_id, post_id) => {
    if(typeof parseInt(user_id) != 'number' || typeof parseInt(post_id) != 'number'){
        const err = new Error('INVALID_INPUT_TYPE');
        err.statusCode = 409;
        throw err;
    };

    const addlike = await likeDao.addlike(
        user_id,
        post_id
    );

    return addlike;
};

module.exports = {
    like
}