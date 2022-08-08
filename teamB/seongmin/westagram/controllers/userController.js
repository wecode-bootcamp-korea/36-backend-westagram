const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { name, email, profile_image, password } = req.body;

        if (!name || !email || !profile_image || !password) {
            return res.status(404).json({message : "KEY_ERROR"});
        }

        await userService.signUp( name, email, profile_image, password);
        return res.status(201).json({
            message : "SIGNUP_SUCCESS"
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

const search = async (req, res) => {
    try {
        const result = await userService.search();
        return res.status(200).json({data : result});
    } catch (err) {
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {
    signUp,
    search
}
