const userDao = require('../models/userDao')

const bcrypt = require('bcrypt');
const saltRounds = 12;

const payLoad = { foo: 'bar' };
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY; 

const signup = async (name, email, profile_image, beforepassword) => {
    if(!email.includes('@')) {
        const err = new Error('EMAIL_INVALID')
        err.statusCode = 400
        throw err
    }
    if(beforepassword.length < 4) {
        const err = new Error('PASSWORD_INVALID')
        err.statusCode = 400
        throw err
    }
    const password = await bcrypt.hash(beforepassword, saltRounds)
    const createUser = await userDao.createUser(name, email, profile_image, password)
    return createUser;
};

const lookup = async (query) => {
    const lookupUser = await userDao.lookupUser()
    const keys = Object.keys(query)
    const values = Object.values(query)
    const objkeys = Object.keys(lookupUser[0])
    if(keys.includes('offset')){
        const result = lookupUser.slice(Number(values[0]),Number(values[1]))
        return result
    }
    else if(keys.includes('ordering')){
        if(values.includes('-id')){
            const result = lookupUser.sort((a, b) => b.id - a.id);
            return result 
        }
        else if(values.includes('created_at')){
            const result = lookupUser.sort((a, b) => a.created_at - b.created_at);
            return result 
        }
        else if(values.includes('-created_at')){
            const result = lookupUser.sort((a, b) => b.created_at - a.created_at);
            return result 
        }
        else if(values.includes('name')){
            const result = lookupUser.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
            return result 
        }
        else if(values.includes('-name')){
            const result = lookupUser.sort((a, b) => a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
            return result 
        }
    }
    else if(keys.includes('search')){
        const result = [];
        for(let key of objkeys){
            for(let user of lookupUser){
                if((user[key]) === values[0]){
                    result.push(user)
                }
            }
        }
        return result
    }
    else if(objkeys.filter(x => keys.includes(x)).length >= 1){
        if(objkeys.filter(x => keys.includes(x)).length === 2){
            const key1 = keys.slice(0, 1)
            const key2 = keys.slice(1, 2)
            const value1 = values.slice(0, 1)
            const value2 = values.slice(1, 2)
            const result1 = lookupUser.filter((x) => x[key1] == value1);
            const result2 = result1.filter((x) => x[key2] == value2);
            return result2
        }
        else {
            const result = lookupUser.filter((x) => x[keys] == values);
            return result
        }
    }
    else {
        return lookupUser
    }
};

const login = async (email, checkpassword) => {
    const loginUser = await userDao.loginUser(email)
    const result = await bcrypt.compare(checkpassword, loginUser[0].password)
    if(result) {
        const token = jwt.sign(payLoad, secretKey)
        return token;
    }
    else {
        const err = new Error('Invalid User')
        err.statusCode = 400
        throw err
    }
};
  
module.exports = {
    signup, lookup, login
}