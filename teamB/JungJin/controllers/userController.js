const userService = require('../services/userService');

const signup = async (req, res) => {
    try {
        const {name, email, profile_image, password} = req.body
        if(!name || !email || !password){
            throw new Error('KEY_ERROR')
        }
        await userService.signup(name, email, profile_image, password);
        res.status(201).json({message: "userCreated"})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

const lookup = async (req, res) => {
    const users = await userService.lookup();
    res.status(200).json({users : users})
};

module.exports = {
	signup, lookup
}