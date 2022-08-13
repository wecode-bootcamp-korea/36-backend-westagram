const userService = require('../services/userService')

const signUp = async(req, res) => {
    try{
        const {name, email, profileImage, password} = req.body;

        if ( !name || !email || !profileImage || !password){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await userService.signUp(name, email, profileImage, password);

        res.status(201).json({message:'SIGNUP_SUCCESS'});

    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const signIn = async(req, res) => {
    try{
        const {email, password} = req.body;

        if ( !email || !password ){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await userService.signIn(email, password);
        res.status(201).json({message:'SIGNIN_SUCCESS'});

    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const postLike = async(req,res) =>{
    try{
        const {postId} = req.params;
        const {userId} = req.body;

        await userService.likePost(userId, postId);
        res.status(200).json({message: 'POSTLIKE_SUCCESS'})
    } catch(err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
}

module.exports ={
    signUp,
    signIn,
    postLike
}