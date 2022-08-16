const validateEmail = (email) => {
    const emailValidation = new RegExp(
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    );
  
    if (!emailValidation.test(email)) {
      const error = new Error("invalid email");
      error.statusCode = 400;
      throw error;
    }
};

const validatePw = (pw) =>{
    const pwValidation = new RegExp(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/
    );

    if(!pwValidation.test(pw)){
        const error = new Error('invalid password');
        error.statusCode = 409;
        throw error;
    }
};
  
module.exports = {
    validateEmail,
    validatePw
};