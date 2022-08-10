
const postService = require('../services/postService')

const enrollPost = async(req, res) => {
    try{
        const {title, content, userId} = req.body;

        if ( !title || !content || !userId){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await postService.enrollPost(title, content, userId);

        res.status(201).json({message:'ENROLLPOST_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const allPost = async(req, res) => {
    try{
        await postService.allPost();

        res.status(201).json({message:'ALLPOST_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const userPost = async(req, res) => {
    try{
        const { userId } = req.params;

        await postService.userPost(userId);

        res.status(201).json({message:'USERPOSTS_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message: err.message});
    }
};


const fixPost = async(req, res) => {
    try{
        const {title, content, postId} = req.body;

        if ( !title || !content || !postId){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await postService.enrollPost(title, content, postId);

        res.status(201).json({message:'FIXPOST_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

module.exports ={
    enrollPost,
    allPost,
    userPost,
    fixPost
}