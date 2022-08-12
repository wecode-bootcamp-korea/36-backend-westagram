
const postServices = require('../services/postServices');

const posting = async (req, res) => {
  try {
    const { userId, title, post } = req.body;

    if ( !userId || !title || !post ) {
      return res.status(400).json({ message: 'FAIL_POSTING' });
    }

    await postServices.posting( userId, title, post );
    return res.status(201).json({
      message: 'POSTING_SUCCESS',
    })
  } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const getPostAll = async (req, res) => {
  try {
    const postAll = await postServices.postAll();
      res.status(200).json({ postAll});
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const getPostUser = async (req, res) => {
  
  const { userId } = req.params;

  try {
    const postUser = await postServices.postUser(userId);
      res.status(200).json( {"userData" : JSON.parse(Object.values(postUser[0])) });
    }

    
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const deletePost = async ( req, res ) => {
  const { postId, userId } = req.params;
  try {
    const deletePost = await postServices.postDelete( postId, userId);
      res.status(200).json({ message: "DELETE SUCCESS" });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const postUpdate = async ( req, res ) => {
  const { postId } = req.params;
  const { title, post } = req.body;
  try {

    if( !post || !title ) {
      throw new Error('INVALID_DATA_INPUT');
    } 

    const postUpdate = await postServices.postUpdate( postId, title, post );
      res.status(200).json({ message: "UPDATE No." + `${postId}` + " POST" });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const postLike = async ( req, res ) => {
  const { postId, userId } = req.params;

  try {
    
    const postLike = await postServices.postLike( postId, userId );
      res.status(200).json({ message: "User" + `${userId}` +" LIKED No." + `${postId}` + " POST" });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};


module.exports = {
  posting,
  getPostAll,
  getPostUser,
  deletePost,
  postUpdate,
  postLike
}