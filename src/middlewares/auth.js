import * as admin from 'firebase-admin';
import auth from '../helpers/auth';
import utils from '../utils';

export const tokenShouldBeValid = async (req, res, next) => {
  const token = utils.auth.getToken(req.headers);
  // Validate the token only if exists

  if (token) {
    try {
      await admin.auth().verifyIdToken(token);
      next();
    } catch (e) {
      return res.unauthorized(e.message);
    }
  } else {
    return next();
  }
};

export const propagateHeaders = (function () {
  return function (req, res, next) {
    auth.headers = req.headers;
    auth.connection = req.connection;
    auth.token = utils.auth.getToken(auth.headers);
    next();
  };
}());
