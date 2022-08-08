const userService = require('../servuces/userServices');

const usersReg = async (req, res) => {
    try {
        const {name, gender, birth, contact, mbti} = req.body;
        
        if (!name || !gender || !birth || !contact || !mbti) {
            return res.status(400).json({message: 'KEY_ERROR'});
        } 

        await userService.usersReg(name, gender, birth, contact, mbti);
        return res.status(201).json({message: 'userCreated'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    usersReg
}