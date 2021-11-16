const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv')
  .config();

const {
  constEnv: {
    PORT,
    CONNECT
  }
} = require('./config');
const {
  code,
  errorMessage
} = require('./errors');

const app = express();
app.use(cors());
mongoose.connect(CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  userRouter,
  authRouter
} = require('./routes');

app.use('/users', userRouter);
app.use('/authorization', authRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log('Ok port', PORT);
  require('./defaultAdmin');
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || code.NOT_FOUND,
    message: err.message || errorMessage.notFound
  });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || code.SERVER_ERROR)
    .json({
      message: err.message
    });
}
