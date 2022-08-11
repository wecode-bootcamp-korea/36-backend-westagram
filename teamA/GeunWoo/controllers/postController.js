const postService = require('../services/postService');

const postPostings = async (req, res) => {
    try {
        const {title, content, user_id} = req.body;

        if (!title || !content || !user_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await postService.postPostings(title, content, user_id);

        return res.status(201).json({message: 'postCreated'})
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getPostings = async (req, res) => {
    try {
        const getPostings = await postService.getPostings();

        return res.status(201).json(getPostings);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const getPostingsByUserId = async (req, res) => {
    try {
        const userId = req.params['user_id'];

        if (!userId) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const data = await postService.getPostingsByUserId(userId);

        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }   
};

const updatePostings = async (req, res) => {
    try {
        const {title, content, post_id, user_id} = req.body;

        if (!title || !content || !post_id || !user_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        const data = await postService.updatePostings(title, content, post_id, user_id);

        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const deletePostings = async (req, res) => {
    try {
        const post_id = req.params['post_id'];

        if (!post_id) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await postService.deletePostings(post_id);

        return res.status(201).json({message: 'postingDeleted'})
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    postPostings, getPostings, getPostingsByUserId, updatePostings, deletePostings
}