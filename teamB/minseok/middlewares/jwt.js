const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const TakenValue = (Value) =>
        {return jwt.verify(Value,secretKey)}
      

const validateToken = async (req, res, next) => {
	try {
        const value = TakenValue(req.headers.authorzation)
        if(value){
            const{name, password} = value
            req.body.name = name;
            req.body.password = password;}
        
        console.log(TakenValue(taken))
        next(); 
        }catch (err) {
            console.log(err)
            res.status(400).json({MESSAGE : "INVAILD_TAKEN"})
	  }
};
module.exports={validateToken, TakenValue}