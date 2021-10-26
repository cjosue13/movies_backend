import * as admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import userAgent from 'express-useragent';

// Helpers
import { sendEmailBadAccess } from '../helpers/email';

// Utils
import utils from '../utils';

// Loaders
// import { getByCriteria as userByCriteria } from '../fixtures/user/loaders';

export default {
  credentials : {},
  headers     : {},
  connection  : {},
  body        : {},
  token       : '',

  // Validate only that Authorization header is present
  // There is an express middleware to validate that the token is valid
  set requireAuthorization (shouldBeAuthenticated) {
    if (
      shouldBeAuthenticated &&
      !Object.keys(this.headers).includes('authorization')
    ) {
      throw new Error('Access denied');
    }
  },

  retrieveUser () {
    return this.getUserFromCriteria();
  },

  checkPassword (user) {
    if (
      !user ||
      !bcrypt.compareSync(this.credentials.Password_User, user.Password_User)
    ) {
      throw new Error('Email and Password combination is incorrect');
    }
    return user;
  },

  async tokenBelongsToClient (session) {
    if (utils.domain.validator(this.headers.origin)) {
      const currentClient = userAgent.parse(this.headers['user-agent']);
      if (
        !(
          currentClient.os === session.d.os &&
          currentClient.browser === session.d.browser
        )
      ) {
        throw new Error('Opa opa! No deberias de hacer esto');
      }
      // const ip = await this.ipAddress;
      // if (ip !== session.d.ip) {
      //   await changePublicIpUserSession(session.d.userSessionId, ip);
      // }
      return session;
    }
    await sendEmailBadAccess(session.d.userSessionId);
    throw new Error('Access denied');
  },

  async getUserFromToken () {
    try {
      if (this.token) {
        return admin.auth().verifyIdToken(this.token);
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  },

  getTokenFromUser () {
    return this.token;
  },
};
