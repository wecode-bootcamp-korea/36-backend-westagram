const likeDao = require('../models/likeDao');
const postDao = require('../models/postDao');
const userDao = require('../models/userDao');

const addlike = async (postId, userId) => {
    const userCheckResult = await userDao.userCheck(userId);
    const postCheckResult = await postDao.postCheck(postId);
    
    const userCheckData = Number(Object.values(userCheckResult[0])[0]);
    const postCheckData = Number(Object.values(postCheckResult[0])[0]);

    if ((userCheckData !== 1) || (postCheckData !== 1)){
        const err = new Error('KEY_ERROR');
        err.statusCode = 400;
        throw err;
    }
    
    const result = await likeDao.addlike(postId, userId);

    return result;
}

module.exports = { addlike };