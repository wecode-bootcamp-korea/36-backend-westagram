const postService = require('../services/postService');

const posting = async (req, res) => {
    try {
        const { title, content, postImage, userId } = req.body;

        if ( !title || !userId ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        await postService.posting (title, content, postImage, userId);

        res.status(201).json({ message : 'POSTING_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
};

const likes = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        if(!postId || !userId ) {
            return res.status(400).json({ message: 'KEY_ERROR'});
        }

        await postService.likes (postId, userId);

        res.status(201).json({ message : 'LIKE_CREATED'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

const deleting = async (req, res) => {
    try {
        const {postId} = req.params;

        if(!postId) {
            return res.status(400).json({ message: 'KEY_ERROR'});
        }

        await postService.deleting ( postId );

        res.status(200).json({ message : 'DELETE_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

const getPostList = async (req, res) => {
    try {
        const posts = await postService.getPostList();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

const updatePost = async (req, res) => {
    try {
        const { title, content, postImage} = req.body;
        const { postId }  = req.params;

        if(!title || !postId) {
            return res.status(400).json({ message: 'KEY_ERROR'});
        }

        const updatedPostInfo = await postService.updatePost(title, content, postImage, postId);

        res.status(200).json(updatedPostInfo);

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }    
}

module.exports = {
    posting,
    likes,
    deleting,
    getPostList,
    updatePost
};