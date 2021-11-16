const router = require('express')
  .Router();

const { userValidator: { auth } } = require('../validator');
const {
  userMiddleware: { validator },
  authMiddleware: {
    authorization,
    verifyToken,
    refresh
  }
} = require('../middlewares');
const {
  authController: {
    loginUser,
    deleteAllToken
  }
} = require('../controllers');
const {
  variables: {
    ACCESS,
    REFRESH
  }
} = require('../config');

router.post('/', validator(auth), authorization, loginUser);
router.post('/exit', verifyToken(ACCESS), deleteAllToken);
router.post('/refresh', verifyToken(REFRESH), refresh);

module.exports = router;
