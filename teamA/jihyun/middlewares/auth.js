//middlewares/auth.js

const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const accessToken = headers.split(" ")[1];

    if (!accessToken) {
      res.status(401).send({ message: "NOT_EXIST_TOKEN" });
    } else {
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          res.status(403).send({ error: err });
        } else {
          req.payload = payload;
        }
      });
    }

    next();
  } catch (err) {
    next(err);
    return res.status(err.statusCode || 403).json({ message: err.message });
  }
};

module.exports = {
  validateToken,
};
