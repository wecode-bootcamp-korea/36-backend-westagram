const postService = require('../services/postService');

const lookup = async (req, res) => {
    const posts = await postService.lookup();
    res.status(200).json({posts : posts})
};

const upload = async (req, res) => {
    try {
        const {title, content, user_id, imageurl} = req.body
        if(!title || !content || !user_id){
            throw new Error('KEY_ERROR')
        }
        await postService.upload(title, content, user_id, imageurl);
        res.status(201).json({message : 'postCreated'})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const del = async (req, res) => {
    try {
        const postid = req.params.postid
        await postService.del(postid);
        res.status(204).send();
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const imagelookup = async (req, res) => {
    const data = await postService.imagelookup();
    res.status(200).json({data : data})
};

const imageuserlookup = async (req, res) => {
    const userid = req.params.userid
    const data = await postService.imageuserlookup(userid);
    res.status(200).json({data : JSON.parse(Object.values(data[0]))})
};

const titlelookup = async (req, res) => {
    const lists = await postService.titlelookup();
    res.status(200).json({data : lists})
};

const titlepostlookup = async (req, res) => {
    const postid = req.params.postid
    const lists = await postService.titlepostlookup(postid);
    res.status(200).json({data : lists[0]})
};

const postpatch = async (req, res) => {
    try {
        const postid = req.params.postid
        const content = req.body.content
        if(!content){
            throw new Error('KEY_ERROR')
        }
        await postService.postpatch(postid, content);
        res.status(201).json({message : "UpdatedSuccess"})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

module.exports = {
   lookup, upload, del, imagelookup, imageuserlookup, titlelookup, titlepostlookup, postpatch
}