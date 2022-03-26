const User = require('../models/User');
const { jwtDecode } = require('../helpers/hash');

module.exports = {
  isLogin: async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        let verify = jwtDecode(bearerToken);
        const user = await User.findById({ _id: verify._id });
        if (user) {
          req.decoded = verify;
        }
        next();
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          res.status(401).json({
            message: 'Session timed out,please login again',
            status: false,
          });
        } else if (error.name === 'JsonWebTokenError') {
          res.status(401).json({
            message: 'Invalid token,please login again!',
            status: false,
          });
        } else {
          res.status(400).json({ error, status: false });
        }
      }
    } else {
      res.status(401).json({
        status: false,
        message: `Access denied, token missing!`,
      });
    }
  },
};
