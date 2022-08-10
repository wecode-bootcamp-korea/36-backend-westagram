const postService = require("../services/postService");

const allPosts = async (req, res) => {
    try {
        const list = postService.allPosts();
        res.status(201).json({"data": list});
    } catch {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const posting = async (req, res) => {
    try {
        const {title, content, user_id} = req.body;
        if(!title || !content || !user_id){
            return res.status(400).json({ message : 'KEY_ERROR'});
        };
        await postService.posting(title, content, user_id);
        return res.status(201).json({message : "POST_CREATED"});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const update = async(req, res) => {
    try {
        const {userId, postId} = req.params;
        const {title, content} = req.body;
        if(!userId || !postId || !title || !content){
            return res.status(400).json({ message : 'KEY_ERROR'});
        };
        await postService.update(userId,postId,title,content);
        return res.status(201).json({ message : "POST_UPDATED"})
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const deletePost = async(req, res) => {
    try {
        const { postId } =req.params;
        if(!postId){
            return res.status(400).json({ message : 'KEY_ERROR'});
        };
        await postService.deletePost(postId);
        return res.status(200).json({message: "POSTING_DELETED"});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};


module.exports = {
    allPosts,
    posting,
    update,
    deletePost
}