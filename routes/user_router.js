const router = require('express')
  .Router();

const {
  variables: {
    ID,
    _ID,
    PARAMS,
    ACCESS
  },
  userRoles: { ADMIN }
} = require('../config');
const {
  userValidator: {
    create,
    update
  }
} = require('../validator');
const {
  userMiddleware: {
    validator,
    checkOn,
    checkEmail,
    checkRole
  },
  authMiddleware: { verifyToken }
} = require('../middlewares');
const {
  userController: {
    updateUser,
    createUser,
    deleteUser,
    getAllUsers
  }
} = require('../controllers');

router.post('/', validator(create), verifyToken(ACCESS), checkEmail, createUser);
router.get('/', verifyToken(ACCESS), getAllUsers);
router.patch('/:id', validator(update), verifyToken(ACCESS), checkOn(ID, PARAMS, _ID), updateUser);
router.delete('/:id', verifyToken(ACCESS), checkOn(ID, PARAMS, _ID), checkRole([ADMIN]), deleteUser);

module.exports = router;
