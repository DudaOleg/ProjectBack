const {
  jwtService,
  userService
} = require('../services');
const {
  code,
  errorMessage
} = require('../errors');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { _id } = req.user;

      const tokenPair = jwtService.generateTokenPair();

      await userService.createToken({
        ...tokenPair,
        user: _id
      });

      res.json({
        ...tokenPair,
        user: req.user
      });
    } catch (err) {
      next(err);
    }
  },
  deleteAllToken: async (req, res, next) => {
    try {
      const { _id } = req.body;

      await userService.deleteAccessAndRefresh({ user: _id });

      res.status(code.DELETE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  }
};
