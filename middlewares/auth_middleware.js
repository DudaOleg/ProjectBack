const {
  userService,
  passwordService: { compare },
  jwtService: {
    verifyToken
  },
  jwtService,
} = require('../services');
const {
  code,
  errorMessage,
  ErrorHandler
} = require('../errors');
const { variables: { AUTHORIZATION } } = require('../config');

module.exports = {
  authorization: async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body;
      const findLogin = await userService.getOneItem({ email })
        .select('+password');

      if (!findLogin) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.wrongEmailOrPass);
      }

      await compare(findLogin.password, password);
      const withoutPass = findLogin.toObject({ getters: false });
      delete withoutPass.password;

      req.user = withoutPass;
      next();
    } catch (err) {
      next(err);
    }
  },
  verifyToken: (word) => async (req, res, next) => {
    try {
      const token = req.body.refreshToken || req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      await verifyToken(token, word);

      const findAccessOrRefresh = await userService.getOneToken({
        $or: [
          { accessToken: token },
          { refreshToken: token }
        ]
      })
        .populate('user');

      if (!findAccessOrRefresh) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      req.tokenUser = findAccessOrRefresh.user;
      next();
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      const { _id } = req.tokenAccRefrUser;

      await userService.deleteOneRefToken({
        refreshToken
      });

      const tokenPair = jwtService.generateTokenPair();

      await userService.createToken({
        ...tokenPair,
        user: _id
      });

      res.status(code.CREATE)
        .json({
          ...tokenPair
        });
    } catch (e) {
      next(e);
    }
  }
};
