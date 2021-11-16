module.exports = {
  PARAMS: 'params',
  ID: 'id',
  _ID: '_id',
  ACCESS: 'access',
  AUTHORIZATION: 'authorization',
  REFRESH: 'refresh',
  EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
  PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
};
