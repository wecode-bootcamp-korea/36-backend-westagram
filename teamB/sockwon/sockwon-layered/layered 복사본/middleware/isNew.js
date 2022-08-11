const appDataSource = require('../models/dataSource');

const isNewUser = async (req,res,next)=>{
    const value = await appDataSource.query(
        `
        SELECT email 
        FROM users
        WHERE email ="${req.body.email}"
        `
    )
    if(value[0]?.email){
        return res.status(400).json({MESSAGE : "already exist user email"})
    }
    next();
}

const isOldUser = async (req,res,next)=>{
    const value = await appDataSource.query(
        `
        SELECT email 
        FROM users
        WHERE email ="${req.body.email}"
        `
    )
    if(value[0]?.email){
        return next();
    }
    return res.status(400).json({MESSAGE : "not exist user email"})
    
}

module.exports = {
    isNewUser, isOldUser
}