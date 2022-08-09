const postsService = require('../service/postsService');

const createPost = async (req, res) => {
    
    try { const {title, content, user_id, userProfileImage, postingImageUrl} = req.body;

        if ( !title || !content || !userProfileImage || !postingImageUrl) {
            return res.status(400).json({ message: 'KEY_ERROR' });
}
        await postsService.createPost(title, content, user_id, userProfileImage, postingImageUrl);
    
        res.status(200).json({message: 'CREATEING POST_SUCCESS',});
}
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}

const searchList = async (req, res) => {
    
    try {
        const list = await postsService.searchList()
        res.status(200).json({data: list})
    }
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}

const updatePost = async (req, res) => {
    
    try {const {title, content} = req.body;
         const postingId = req.params.postId;

         if( !title || !content || !postingId) {
        return res.status(400).json({ message: 'KEY_ERROR' });
         }
         const update =await postsService.updatePost(title, content, postingId)
         res.status(200).json({data: update})
    }
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}
  
const deletePost = async (req, res) => {
    
    try {const Delete = req.params.Id;
        if(!Delete) {
            return res.status(400).json({message: 'KEY_ERROR'})
        }
        await postsService.deletePost(Delete)
        res.status(200).json({message: "DELETE_SUCCESS"});
    }
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}

  module.exports={createPost, searchList, updatePost, deletePost}
    


