const likeService = require('../services/likeService');

const newLike = (req, res)=>{
    try {
        const { user_id, post_id } = req.body;

        if( !post_id || !user_id ){
            return res.status(400).json({message : `data invalid`})
        }

        likeService.createLike( user_id, post_id );
        return res.status(201).json({MESSAGE : "post success"})
    }
    catch(err) {
        return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE});
    }
}

module.exports = {
    newLike
}