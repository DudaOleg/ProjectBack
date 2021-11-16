const {
  ErrorHandler,
  errorMessage,
  code
} = require('../errors');
const {
  userService
} = require('../services');

module.exports = {
  validator: (validator) => (req, res, next) => {
    try {
      const { error } = validator.validate(req.body);
      if (error) {
        throw new ErrorHandler(code.BAD_REQUEST, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRole: (roleArray = []) => (req, res, next) => {
    try {
      const {
        role,
        _id
      } = req.tokenUser;
      const { id } = req.params;

      if (!roleArray.length) {
        return next();
      }

      if (_id.toString() === id) {
        return next();
      }

      if (!roleArray.includes(role)) {
        throw new ErrorHandler(code.FORBIDDEN, errorMessage.forbidden);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkOn: (params, searchIn = 'body', dbField = params) => async (req, res, next) => {
    try {
      const value = req[searchIn][params];

      const user = await userService.getOneItem({
        [dbField]: value
      });

      if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundUser);
      }

      req.checkOnUser = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await userService.getOneItem({ email });

      if (user) {
        throw new ErrorHandler(code.IS_USED, errorMessage.emailIsUsed);
      }
      req.checkEmailorLogin = req.body;
      next();
    } catch (e) {
      next(e);
    }
  }
};
