const validatePw = (password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    
    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_INVALID');
        err.statusCode = 409;
        throw err;
    }
}

module.exports = {
    validatePw
}