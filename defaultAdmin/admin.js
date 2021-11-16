const { userDB } = require('../dataBase');
const { passwordService: { hash } } = require('../services');
const {
  userRoles: {
    ADMIN
  },
  constEnv: {
    FIRST_NAME_ADMIN,
    PASS_ADMIN,
    LAST_NAME_ADMIN,
    EMAIL_ADMIN,
    USER_NAME_ADMIN
  }
} = require('../config');

module.exports = (async () => {
  const user = await userDB.findOne();

  if (!user) {
    const defaultAdmin = {
      firstName: FIRST_NAME_ADMIN,
      lastName: LAST_NAME_ADMIN,
      password: await hash(PASS_ADMIN),
      email: EMAIL_ADMIN,
      userName: USER_NAME_ADMIN,
      role: ADMIN
    };

    await userDB.create(defaultAdmin);
  }
})();
