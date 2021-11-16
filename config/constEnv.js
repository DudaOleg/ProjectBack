module.exports = {
  PORT: process.env.PORT || 5001,
  CONNECT: process.env.CONNECT || 'mongodb://localhost:27017/asdfghj',

  ACCESS_SECRET_KEY: process.env.AccessSecretKey || '1secret',
  REFRESH_SECRET_KEY: process.env.RefreshSecretKey || '2secret',

  FIRST_NAME_ADMIN: process.env.FIRST_NAME_ADMIN || 'Admin',
  LAST_NAME_ADMIN: process.env.LAST_NAME_ADMIN || 'Admin',
  PASS_ADMIN: process.env.PASS_ADMIN || 'Admin123',
  EMAIL_ADMIN: process.env.EMAIL_ADMIN || 'admin@gmail.com',
  USER_NAME_ADMIN: process.env.USER_NAME_ADMIN || 'Admin'
};
