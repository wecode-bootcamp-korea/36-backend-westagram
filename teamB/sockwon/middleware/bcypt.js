const bcrypt = require("bcrypt");

const makeHash = async (password, saltRounds)=>{
	const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
}

const verifyHash = async (password, hashedPassword)=>{
    const result =await bcrypt.compare(password,hashedPassword);
    return result;
}


module.exports = {
    makeHash, verifyHash
}