const postService = require('../services/postService');


const postRegist = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, content } = req.body;
        const token = req.headers.authorization;
        if ( (!title || !userId) && !token) {

            return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.postRegist( title, content, userId, token );

        res.status(201).json({ message: "아주 좋은 게시글이구만" });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const allPost = async (req, res) => {
    try{
    const post = await postService.allPost();
    return res.status(201).json({ data: post});

    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
}

const userPost = async(req, res) => {
    try{
        const { userId } = req.params;

        if ( !userId ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }
        const post = await postService.userPost( userId );
        return res.status(200).json({ 'data': post});
    
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            });
        }
}

const updatePost = async (req, res) => {
    try{
        const { userId, postId } = req.params;
        const { title, content } = req.body;

        if ( !userId || !postId || ( !title || !content )) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }
        await postService.updatePost( 
            userId, postId, title, content
        );
        return res.status(200).json({ message: "POST_CREATED"});
    
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            });
        }
}

const deletePost = async (req, res) => {
    try{
        const { postId } = req.params;

        if ( !postId ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }
        await postService.deletePost( postId );
        return res.status(200).json({ message: "POST_DELETE"});
    
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            });
        }
}

const likePost = async (req, res) => {
    try{
        const { postId } = req.params;
        const { userId } = req.body;
        if ( !userId || !postId ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }
        await postService.likePost( postId, userId );
        return res.status(200).json({ message: "POST_LIKE"});
    
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            });
        }
}
module.exports = {
	postRegist,
    allPost,
    userPost,
    updatePost,
    deletePost,
    likePost
}