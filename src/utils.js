import fs from 'fs';
import path from 'path';
import checkit from 'checkit';
import tldjs from 'tldjs';
import fetch from 'node-fetch';
import logger from './helpers/logger';
import { PermissionsError, EmbedError } from './errors';

function importGlobalSchema () {
  return fs
    .readFileSync(path.resolve(__dirname, './fixtures/schema.graphql'))
    .toString();
}

function importQuerySchema () {
  return fs
    .readFileSync(path.resolve(__dirname, './fixtures/query.graphql'))
    .toString();
}

function importMutationSchema () {
  return fs
    .readFileSync(path.resolve(__dirname, './fixtures/mutation.graphql'))
    .toString();
}

function importSubscriptionSchema () {
  return fs
    .readFileSync(path.resolve(__dirname, './fixtures/subscription.graphql'))
    .toString();
}

function importSchema (module) {
  return fs
    .readFileSync(path.resolve(__dirname, `./fixtures/${module}/schema.graphql`))
    .toString();
}

function importResolver (module) {
  return require(path.resolve(__dirname, `./fixtures/${module}/resolver.js`))
    .default;
}

function importAll (module) {
  return {
    schema   : importSchema(module),
    resolver : importResolver(module),
  };
}

function importSubmodule (module, submodule) {
  return {
    schema   : importSchema(`${module}/${submodule}`),
    resolver : importResolver(`${module}/${submodule}`),
  };
}
function handleCheckitErrors (err) {
  const errors = err.toJSON();
  const keys = Object.keys(errors);
  const firstErrorGroup = errors[keys[0]];

  return firstErrorGroup[0];
}
function handlePermissionsErrors (err) {
  return err.code;
}

function handleEmbedErrors (err) {
  return err.message;
}

function handleBookshelfErrors (err) {
  logger.log('warn', err.stack);
  return err.code;
}

function handleErrors (err) {
  if (err instanceof checkit.Error) {
    return handleCheckitErrors(err);
  }

  if (err instanceof PermissionsError) {
    return handlePermissionsErrors(err);
  }

  if (err instanceof EmbedError) {
    return handleEmbedErrors(err);
  }

  return handleBookshelfErrors(err);
}

function defaultValues (args) {
  let order = { by : 'id', dir : 'ASC' };
  if (args.order) {
    order = { by : args.order.by || 'id', dir : args.order.dir || 'ASC' };
  }
  return order;
}

function getToken (headers) {
  let auth;
  if (!(auth = headers.authorization)) return null;
  const [schema, token] = auth.split(' ');
  return schema.toLowerCase() !== 'bearer' ? null : token;
}

function isValid (_domain) {
  if (process.env.NODE_ENV === 'develop') {
    return true;
  }
  const result = tldjs.parse(_domain);
  const validSubdomains = ['market', 'lodge', 'citas', 'zero'];
  const validDomain = 'tavuel506.com';

  if (!result || !result.isValid) {
    throw new Error('Domain not recognized');
  }
  if (result.hostname === 'localhost') {
    return true;
  } else if (
    validSubdomains.includes(result.subdomain) &&
    result.domain === validDomain
  ) {
    return true;
  } else if (!result.subdomain && result.domain === validDomain) {
    return true;
  }
  return false;
}

function getUrl (_domain) {
  const result = tldjs.parse(_domain);
  const validSubdomains = ['market', 'lodge', 'citas', 'zero'];
  const validDomain = 'tavuel506.com';
  let url = '';
  if (!result || !result.isValid) {
    url = 'desconocido';
  }
  if (result.hostname === 'localhost') {
    url = 'localhost';
  } else if (
    validSubdomains.includes(result.subdomain) &&
    result.domain === validDomain
  ) {
    url = `${result.subdomain}.${validDomain}`;
  } else if (!result.subdomain && result.domain === validDomain) {
    url = result.domain;
  } else {
    url = result.hostname;
  }
  return url;
}

function urlIsEmbeddable (url) {
  return fetch(url, { timeout : 10000 }).then(res => {
    const contentSecurityPolicy = (
      res.headers.get('content-security-policy') || ''
    ).toLowerCase();
    if (contentSecurityPolicy.includes('frame-ancestors')) {
      throw new EmbedError('The URL given is not embeddable');
    }

    const xframeOptions = (
      res.headers.get('x-frame-options') || ''
    ).toLowerCase();
    if (['sameorigin', 'deny'].includes(xframeOptions)) {
      throw new EmbedError('The URL given is not embeddable');
    }
  });
}

function getImageOrientation (img) {
  return img.width > img.height ? 'landscape' : 'portrait';
}

function downloadToBuffer (url) {
  return fetch(url).then(res => res.buffer());
}

function getUserCroppedPicture (data, logoType, size, PlaceId = null) {
  const defaultImg =
    'https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FemptyImg.png?alt=media&token=d3b629c3-3506-4bc7-aef6-21f7ac63b1e8.png';
  if (data) {
    let d1;
    const d2 = new Date(data.Created_At);
    const today = new Date();
    today.setHours(6);
    let newRouteFile = data.Route_File;
    if (logoType === 'place') {
      d1 = new Date('2020-06-10T22:34:54.000Z');
    } else if (logoType === 'event') {
      d1 = new Date('2020-01-25T11:00:00.000Z');
    } else if (logoType === 'gallery') {
      d1 = new Date('2021-01-18T11:17:00.000Z');
    }
    if (data.Updated_At > new Date('2020-02-03T00:00:00.000Z')) {
      const enviroment =
        process.env.NODE_ENV === 'development' ? 'dev%2F' : 'prod%2F';
      if (logoType === 'person') {
        if (
          !data.Route_File.includes('_200x200.png?') &&
          !data.Route_File.includes(`%2Fpeople%2F${enviroment}thumbs%2F`)
        ) {
          newRouteFile = data.Route_File.replace(
            `people%2F${enviroment}`,
            `people%2F${enviroment}thumbs%2F`
          );
          newRouteFile = newRouteFile.replace('.png?', '_200x200.png?');
        }
      }
      if (logoType === 'place' && PlaceId !== null) {
        if (
          !data.Route_File.includes('_200x200.png?') &&
          !data.Route_File.includes(`%2Fplace_${PlaceId}%2F${enviroment}thumbs%2F`)
        ) {
          newRouteFile = data.Route_File.replace(
            `place_${PlaceId}%2F${enviroment}`,
            `place_${PlaceId}%2F${enviroment}thumbs%2F`
          );
          newRouteFile = newRouteFile.replace('.png?', '_200x200.png?');
        }
      }
      if (logoType === 'event') {
        if (
          !data.Route_File.includes('_200x200.png?') &&
          !data.Route_File.includes('%2Fevents%2Fthumbs%2F')
        ) {
          newRouteFile = data.Route_File.replace(
            'events%2F',
            'events%2Fthumbs%2F'
          );
          newRouteFile = newRouteFile.replace('.png?', '_200x200.png?');
        }
      }
      if (logoType === 'logo') {
        if (
          !data.Route_File.includes('_200x200.png?') &&
          !data.Route_File.includes('%2Fthumbs%2Flogo-')
        ) {
          newRouteFile = data.Route_File.replace(
            '%2Flogo-',
            '%2Fthumbs%2Flogo-'
          );
          newRouteFile = newRouteFile.replace('.png?', '_200x200.png?');
        }
      }
      if (logoType === 'gallery') {
        if (
          !data.Route_File.includes('_400x400.png?') &&
          !data.Route_File.includes('%2Fgallery%2Fthumbs%2F')
        ) {
          newRouteFile = data.Route_File.replace(
            'gallery%2F',
            'gallery%2Fthumbs%2F'
          );
          newRouteFile = newRouteFile.replace('.png?', '_400x400.png?');
        }
      }
    } else if (d1 < d2 && size === 1) {
      if (
        !data.Route_File.includes('_200x200.png?') &&
        !data.Route_File.includes('%2Fplace%2Fthumbs%2F')
      ) {
        newRouteFile = data.Route_File.replace('place%2F', 'place%2Fthumbs%2F');
        newRouteFile = newRouteFile.replace('.png?', '_200x200.png?');
      }
    } else if (d1 < d2 && size === 2) {
      if (
        !data.Route_File.includes('_400x400.png?') &&
        !data.Route_File.includes('%2Fplace%2Fthumbs%2F')
      ) {
        newRouteFile = data.Route_File.replace('place%2F', 'place%2Fthumbs%2F');
        newRouteFile = newRouteFile.replace('.png?', '_400x400.png?');
      }
    }
    return newRouteFile;
  }
  return defaultImg;
}
export default {
  import : {
    globalSchema       : importGlobalSchema,
    querySchema        : importQuerySchema,
    mutationSchema     : importMutationSchema,
    subscriptionSchema : importSubscriptionSchema,
    schema             : importSchema,
    resolver           : importResolver,
    submodule          : importSubmodule,
    all                : importAll,
  },
  errors : {
    handleErrors,
    checkitHandler   : handleCheckitErrors,
    bookshelfHandler : handleBookshelfErrors,
  },
  orderBy : {
    defaultValues,
  },
  domain : {
    validator : isValid,
    getUrl,
  },
  auth : {
    getToken,
  },
  url : {
    isEmbeddable : urlIsEmbeddable,
  },
  image : {
    orientation  : getImageOrientation,
    download     : downloadToBuffer,
    croppedImage : getUserCroppedPicture,
  },
};
