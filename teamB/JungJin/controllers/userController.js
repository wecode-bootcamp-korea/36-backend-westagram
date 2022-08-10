const userService = require('../services/userService');

const signup = async (req, res) => {
    try {
        const beforepassword = req.body.password
        const {name, email, profile_image} = req.body
        if(!name || !email || !beforepassword){
            throw new Error('KEY_ERROR')
        }
        await userService.signup(name, email, profile_image, beforepassword);
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

const login = async (req, res) => {
    try {
        const email = req.body.email
        const checkpassword = req.body.password
        if(!checkpassword){
            throw new Error('KEY_ERROR')
        }
        const token = await userService.login(email, checkpassword);
        res.status(201).json({"accessToken" : token})
    }
    catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }
};

module.exports = {
	signup, lookup, login
}