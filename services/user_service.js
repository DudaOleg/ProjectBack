const {
  userDB,
  tokenDB
} = require('../dataBase');

module.exports = {
  createUser: (item) => userDB.create(item),
  getOneItem: (item) => userDB.findOne(item),
  getAllUsers: () => userDB.find(),
  deleteOneUser: (item) => userDB.deleteOne(item),
  updateOneUser: (item, data) => userDB.updateOne(item, data),
  findByIdAndUpdateUser: (item, data) => userDB.findByIdAndUpdate(item, data),

  createToken: (item) => tokenDB.create(item),
  deleteAccessAndRefresh: (item) => tokenDB.findOneAndDelete(item),
  getOneToken: (item) => tokenDB.findOne(item),
  deleteOneRefToken: (item) => tokenDB.deleteOne(item),
  deleteAllToken: (item) => tokenDB.deleteMany(item)
};
