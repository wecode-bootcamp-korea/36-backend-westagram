const likeService = require('../services/likeService');

const addlike = async (req, res) => {
    const { postId, userId } = req.params;

    try {
        await likeService.addlike(postId, userId);
        return res.status(201).json({message: "likeCreated"});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {
    addlike
}