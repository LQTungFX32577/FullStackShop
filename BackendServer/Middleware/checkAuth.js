const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).send('unAuthorization');
  }
  const token = authHeader.split(' ')[1];
  console.log(token)
  if (!token) {
    res.status(401).send('unAuthorization');
  }
  jwt.verify(token, process.env.JWT_Secret, (err,data) => {
    
    if(err) {
      return res.status(403).send('invalidToken')
    };  
    req.userId = data.userId;
    req.role = data.role;
    req.email = data.email;
    next();
  });
};

