const likeService = require('../services/likeService');

const lookup = async (req, res) => {
    const likes = await likeService.lookup();
    res.status(200).json({data : likes})
};

const heart = async (req, res) => {
    try {
        const {user_id, post_id} = req.body
        if(!user_id || !post_id){
            const err = new Error('KEY_ERROR')
            err.statusCode = 400
            throw err
        }
        await likeService.heart(user_id, post_id);
        res.status(201).json({message : 'likeCreated'})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

module.exports = {
    lookup, heart
}
