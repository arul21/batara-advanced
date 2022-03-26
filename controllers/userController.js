const { User } = require('../models');
const { encode, jwtEncode } = require('../helpers/hash');
const bcrypt = require('bcryptjs');

module.exports = {
  registerUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const findUser = await User.find({
        username,
      });

      if (findUser.length === 0) {
        const response = await User.create({
          username,
          password: encode(password),
        });

        const user = response.toObject();
        delete user.password;
        res.status(201).json({
          success: true,
          message: 'success create user',
          data: user,
        });
      } else {
        res.status(409).json({
          success: false,
          message: `${username} already register`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'error create user',
        data: error.stack,
      });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        username,
      }).select('+password');
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const userLogin = await User.findById({
            _id: user._id,
          });
          res.status(200).json({
            success: true,
            message: `Succesfully Login`,
            data: userLogin,
            token: jwtEncode({
              _id: userLogin?._id,
              role: userLogin?.role,
              username: userLogin?.username,
            }),
          });
        } else {
          res.status(422).json({
            success: false,
            message: `Hii ${user.username} Wrong password! Please Try again!`,
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: `Username not register`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error Server',
        data: error.stack,
      });
    }
  },
};
