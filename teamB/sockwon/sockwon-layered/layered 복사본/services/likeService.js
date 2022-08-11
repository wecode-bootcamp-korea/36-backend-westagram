const postDao = require('../models/likeDao');

const createLike = async (user_id, post_id)=> {
    try{
    const createLike = await postDao.createLike(
        user_id,
        post_id
)
    return createLike;
}catch(err){
    const error = new Error("likeService.. INVALID DATA->user_id, post_id");
        error.statusCode = 400;
        throw error;
}

}
module.exports = {
    createLike
}