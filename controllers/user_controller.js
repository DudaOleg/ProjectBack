const {
  code,
  errorMessage
} = require('../errors');
const {
  userService,
  passwordService
} = require('../services');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hash(password);

      await userService.createUser({
        ...req.body,
        password: hashedPassword
      });

      res.status(code.CREATE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await userService.getAllUsers(req.body);

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { _id } = req.checkOnUser;

      await userService.findByIdAndUpdateUser({ _id }, req.body,);

      const upUser = await userService.getOneItem({ _id });

      res.status(code.CREATE)
        .json(upUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteOneUser({ _id: id });
      await userService.deleteAllToken({ user: id });

      res.sendStatus(code.DELETE);
    } catch (e) {
      next(e);
    }
  }
};
