const validateEmail = (email) => {
  const usableEmail = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  if (!usableEmail.test(email)) {
    const err = new Error("INVALID_EMAIL");
    err.statusCode = 400;
    throw err;
  }
};

const validatePwd = (password) => {
  const usablePwd = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/

  if (!usablePwd.test(password)) {
    const err = new Error("INVALID_PWD");
    err.statusCode = 400;
    throw err;
  }  
};

module.exports = {
  validateEmail,
  validatePwd
};
