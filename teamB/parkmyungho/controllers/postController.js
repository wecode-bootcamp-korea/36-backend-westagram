const postService = require('../services/postService')

const createPost = async(req, res) => {
    try{
        const {title, content, userId} = req.body;

        if ( !title || !content || !userId){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await postService.createPost(title, content, userId);

        res.status(201).json({message:'CREATE_POST_SUCCESS'});
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const getPosts = async(req, res) => {
    try{
        const postsList = await postService.getPosts();

        res.status(200).json({data: postsList});
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const getUserPosts = async(req, res) => {
    try{
        const { userId } = req.params;

        const postsList = await postService.getUserPosts(userId);

        res.status(200).json({data: postsList});
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const updatePost = async(req, res) => {
    try{
        const {userId} = req.params;
        const {title, content, postId} = req.body; 

        if ( !title || !content || !postId){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await postService.updatePost(title, content, postId, userId);

        res.status(201).json({message:'UPDATE_POST_SUCCESS'});
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const deletePost = async(req, res) =>{
    try{
        const {postId} = req.params;
        
        await postService.deletePost(postId);

        res.status(200).json({message: 'DELETE_POST_SUCCESS'})

    } catch(err){
        return res.status(err.statusCode||500).json({message: err.message})
    }
}

module.exports ={
    createPost,
    getPosts,
    getUserPosts,
    updatePost,
    deletePost
}