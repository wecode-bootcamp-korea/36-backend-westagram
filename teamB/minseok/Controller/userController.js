const userService = require('../service/userService')

const signUp = async (req, res) => {
    try { const {name, birth, contact, password} = req.body;

        if ( !name || !birth || !contact || !password ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
}
        await userService.signUp(name, birth, contact, password);
    
        res.status(201).json({message: 'SIGNUP_SUCCESS',});
}
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}

const searchUserList = async (req, res) => {
    try {const userId =req.params.id;
        if(!userId) {
            return res.status(400).json({message: 'KEY_ERROR'})
        }
        const users = await userService.searchUserList(userId)
        
        res.status(200).json({data: users});
    }
    catch (err) {console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
  }}

module.exports = {signUp, searchUserList}
