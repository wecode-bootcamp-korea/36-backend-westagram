const emailValidation = (email) => {
  const emailCheck = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  if (!emailCheck.test(email)) {
    const err = new Error("INVALID_EMAIL");
    err.statusCode = 401;
    throw err;
  }
};

module.exports = {
  emailValidation,
};
