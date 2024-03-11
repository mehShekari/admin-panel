const jwt = require("jsonwebtoken");

const checkAuthToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: "big problems!" });
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ error: "no access!" });
    req.user = user;
    next();
  })
}

module.exports = checkAuthToken;