const postService = require('../services/postService');

const newPost = (req, res)=>{
    try {
        const { title, content, user_id } = req.body;

        if( !title || !content || !user_id ){
            return res.status(400).json({message : `data invalid!`})
        }

        postService.createPost( title, content, user_id );
        return res.status(201).json({MESSAGE : "post success!"})
    }
    catch(err) {
        return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE});
    }
}

const getAllPost = async (req, res)=>{
    try {
    const {user_id} = req.body;
    
    if(!user_id){
        return res.status(400).json({message : `data invalid!`})
    }

    const rows = await postService.getAllPost(user_id); 
    return res.status(200).json({MESSAGE : "get all post success!", data : rows})
    }catch(err){
        return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE})
    }
}

const deletePost= async (req, res)=>{
    try {
    const {postId} = req.body;
    if(typeof(postId) !== 'number'){
        return await res.status(400).json({message : `invalid data!`})
    }
    postService.deletePost(postId); 
    return await res.status(204).json({MESSAGE : "delete success!"})
    }catch(err){
        return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE})
    }
} 

const patchPost=(req,res)=>{
    try {
        const {title, content, postId} = req.body;
        
        if(!title || !content || !postId){
            return res.status(400).json({message : `data invalid!`})
        }
    
        postService.patchPost(title, content, postId); 
        return res.status(201).json({MESSAGE : "PATCH success!"})
        }catch(err){
            return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE})
        }
}

const logIn= async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({message : 'id, password invalid'})
        }

        const token = await postService.logIn(email, password);
        if(token){
            return res.status(201).json({MESSAGE : "login success!", TOKEN : token});
        }
        return res.status(400).json({MESSAGE : "login failed!", TOKEN : token});
    }catch(err){
        return res.status(err.statusCode || 500).json({MESSAGE : err.MESSAGE})
    }
}

module.exports = {
    newPost, getAllPost, deletePost, patchPost, logIn
}
