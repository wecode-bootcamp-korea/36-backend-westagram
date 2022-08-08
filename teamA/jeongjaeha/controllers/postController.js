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
      res.status(200).json({ postUser });
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

const updatePost = async ( req, res ) => {
  const { no, id } = req.params;
  const { post } = req.body;
  try {
    const updatePost = await postServices.updatePost( no, id, post );
      res.status(200).json({ message: "UPDATE No." + `${no}` + " POST" });
    }
     catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
  } 
};

const likePost = async ( req, res ) => {
  const { no, id } = req.params;
  try {
    const likePost = await postServices.likePost( no, id );
      res.status(200).json({ message: "LIKED No." + `${no}` + " POST" });
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
  updatePost,
  likePost
}