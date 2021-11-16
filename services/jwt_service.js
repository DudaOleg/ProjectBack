const jwt = require('jsonwebtoken');
const util = require('util');
const {
  code,
  ErrorHandler,
  errorMessage
} = require('../errors');
const {
  variables: {
    ACCESS,
    REFRESH
  },
  constEnv: {
    ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY
  }
} = require('../config');

util.promisify(jwt.verify);

const generateTokenPair = () => {
  const accessToken = jwt.sign({}, ACCESS_SECRET_KEY, {
    expiresIn: '120m'
  });
  const refreshToken = jwt.sign({}, REFRESH_SECRET_KEY, {
    expiresIn: '120m'
  });

  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = async (token, tokenType = ACCESS) => {
  try {
    let secret = '';
    switch (tokenType) {
      case ACCESS:
        secret = ACCESS_SECRET_KEY;
        break;
      case REFRESH:
        secret = REFRESH_SECRET_KEY;
        break;
    }

    await jwt.verify(token, secret);
  } catch (e) {
    throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
  }
};

module.exports = {
  verifyToken,
  generateTokenPair
};
