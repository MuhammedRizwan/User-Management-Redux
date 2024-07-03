const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
    try {
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      console.log(decoded);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  
    return next();
  };
  
module.exports = verifyToken;