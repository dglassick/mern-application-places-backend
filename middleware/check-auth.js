const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-errors');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Authoroization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication faile!');
    }
    console.log(token);
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};
