const likesDao = require('../models/likesDao')

const likeList = async (user_id, post_id) => {
    console.log(typeof(user_id),typeof(post_id))
    if(user_id === post_id){
        const err = new Error("CAN'T_MARK YOUR POST")
        err.statusCode = 409;
        throw err;}
    const postLike = await likesDao.postLike(user_id, post_id);
        return postLike}

module.exports={likeList}