const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY

const newJwt = (payLoad)=>{
    return jwt.sign(payLoad, secretKey);
}

const isRightToken = (jwtToken)=>{
    return jwt.verify(jwtToken, secretKey)
}

const validationToken = async (req,res,next)=>{
    try {
        const token= req.headers.authorization;
        const result = isRightToken(token);
        if(result){
            const {id, email} = result
            req.body.user_id = id;
            req.body.email = email;
            next();
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({MESSAGE : "INVALID TOKEN! reject"})
    }
}

module.exports = {
    newJwt, isRightToken, validationToken
}
