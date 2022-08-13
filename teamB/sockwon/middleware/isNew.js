const appDataSource = require('../models/dataSource');

const test = async (req)=>{
    const temp =  await appDataSource.query(
        `
        SELECT email 
        FROM users
        WHERE EXISTS (
            SELECT * 
            FROM users 
            WHERE users.email ="${req.body.email}"
            )
        `
    )
    if(temp.length === 0) return true; 
    return false; 
}

const isNewUser = async (req,res,next)=>{
    const value = await test(req);
    if(req.path === "/signup"){
        let result;
        value === true 
        ? result = next() 
        : result = res.status(400).json({MESSAGE : "exist user email"})
        return result;
    }else{
        let result;
        value === true 
        ? result = res.status(400).json({MESSAGE : "not exist user email"}) 
        : result = next();
        return result;
    }    
}

module.exports = {
    isNewUser
}