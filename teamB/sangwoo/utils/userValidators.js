const validateEmailPw = (email, password) => {

    const emValidation = new RegExp(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    );

    const pwValidation = new RegExp(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20}$)/
    );

    if (!emValidation.test(email) || !pwValidation.test(password)) {
        const err = new Error("EMAIL_OR_PASSWORD_NOT_AVAILABLE");
        err.statusCode = 400;
        throw err;
    }
}

module.exports = {
    validateEmailPw
};