const userService = require('../services/userService');

const createUsers = async (req, res) => {
    try {
        const {name, gender, birth, contact, mbti} = req.body;

        if (!name || !gender || !birth || !contact || !mbti) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await userService.createUsers(name, gender, birth, contact, mbti);
        
        return res.status(201).json({message: 'userCreated'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    createUsers
}