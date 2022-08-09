const postDao = require('../models/postDao')

const lookup = async () => {
    const lookupPost = await postDao.lookupPost()
    return lookupPost;
    };

const upload = async (title, content, user_id, imageurl) => {
    const uploadPost = await postDao.uploadPost(title, content, user_id, imageurl)
    return uploadPost
}

const del = async (postid) => {
    const delPost = await postDao.delPost(postid)
    return delPost
}

const imagelookup = async () => {
    const imagelookupData = await postDao.imagelookupData()
    return imagelookupData;
};

const imageuserlookup = async (userid) => {
    const imageuserlookupData = await postDao.imageuserlookupData(userid)
    return imageuserlookupData;
};

const titlelookup = async () => {
    const titlelookupList = await postDao.titlelookupList()
    return titlelookupList;
};

const titlepostlookup = async (postid) => {
    const titlepostlookupList = await postDao.titlepostlookupList(postid)
    return titlepostlookupList;
};

const postpatch = async (postid, content) => {
    const postpatchList = await postDao.postpatchList(postid, content)
    return postpatchList;
};

module.exports = {
   lookup, upload, del, imagelookup, imageuserlookup, titlelookup, titlepostlookup, postpatch
}