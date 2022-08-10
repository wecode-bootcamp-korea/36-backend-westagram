const likeService = require("../services/likeService");

const like = async (req, res) => {
    try {
        const {user_id, post_id} = req.body;
        if(!user_id, !post_id){
            return res.status(400).json({ message : 'KEY_ERROR'});
        };

        await likeService.like(user_id, post_id);
        return res.status(201).json({message : "LIKE_CREATED"});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    like
}