const userService = require('../services/userService');

const signup = async (req, res) => {
    try {
        const { name, email, profileImage, password} = req.body;

        if ( !name || !email || !password ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }
        await userService.signup ( name, email, profileImage, password);

        res.status(201).json({ message : 'SIGNUP_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

const getPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        const userPosts = await userService.getPosts(userId);

        res.status(200).json(userPosts);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

module.exports = {
    signup,
    getPosts
};