const pwValidaiton = (password) => {
  const pwCheck = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwCheck.test(password)) {
    const err = new Error("INVALID_PASSWORD");
    err.statusCode = 401;
    throw err;
  }
};

module.exports = {
  pwValidaiton,
};
