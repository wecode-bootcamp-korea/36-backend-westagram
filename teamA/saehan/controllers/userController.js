const userService = require("../services/userService");

const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message : 'KEY_ERROR'});
        };

        await userService.signUp(name, email, password);
        return res.status(201).json({message : 'SIGNUP_SUCCESS'});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

const posts = async (req, res) => {
    try {
        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({ message : 'KEY_ERROR'});
        };

        const obj = await userService.posts(userId);
        return res.status(200).json({ "data" : obj})
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
};

module.exports = {
    signUp,
    posts
}