const postServices = require('../services/postServices');

const posting = async (req, res) => {
  try {
    const { user_id, title, post } = req.body;

    if ( !user_id || !title || !post ) {
      return res.status(400).json({ message: 'FAIL_POSTING' });
    }

    await postServices.posting( user_id, title, post );
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
  const { id } = req.params;
  try {
    const postUser = await postServices.postUser(id);
      res.status(200).json( {"userData" : JSON.parse(Object.values(postUser[0])) });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const deletePost = async ( req, res ) => {
  const { no, id } = req.params;
  try {
    const deletePost = await postServices.postDelete( no, id );
      res.status(200).json({ message: "DELETE SUCCESS" });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const postUpdate = async ( req, res ) => {
  const { no } = req.params;
  const { title, post } = req.body;
  try {
    const postUpdate = await postServices.postUpdate( no, title, post );
      res.status(200).json({ message: "UPDATE No." + `${no}` + " POST" });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const postLike = async ( req, res ) => {
  const { no, id } = req.params;
  const { title, post } = req.body 
  try {
    const postLike = await postServices.postLike( no, id, title, post );
      res.status(200).json({ message: "User" + `${id}` +" LIKED No." + `${no}` + " POST" });
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