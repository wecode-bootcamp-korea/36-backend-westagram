const likesService = require('../service/likesService');

const likeList = async (req, res) => {
    try { const {user_id, post_id} = req.body;
        if ( !user_id || !post_id){
            return res.status(400).json({ message: 'KEY_ERROR' });
}
        await likesService.likeList(user_id, post_id);
        res.status(201).json({message: 'likeList_SUCCESS',});
}
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}

module.exports={likeList}
