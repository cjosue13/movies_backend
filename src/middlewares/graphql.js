import graphql from 'express-graphql';
import schema from '../schema';
import auth from '../helpers/auth';
// import { requestDeviceUuid } from '../fixtures/device/loaders';

const middleware = () =>
  graphql(async req => {
    let user = {};

    const googleAuth = {};
    const ip_address = req.clientIp;
    // const userDevice = await requestDeviceUuid(req.headers.uuid);
    if (req.headers.authorization) {
      user = await auth.getUserFromToken();
    }
    return {
      schema,
      context : {
        googleAuth,
        user,
        ip_address,

        // userDevice,
      },
      graphiql    : ['development', 'staging'].includes(process.env.NODE_ENV),
      pretty      : ['development', 'staging'].includes(process.env.NODE_ENV),
      formatError : error => ({
        message : error.message,
      }),
    };
  });

export default middleware();
