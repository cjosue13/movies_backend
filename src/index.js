

import app from './server';

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({
    status : 'Running'
  }));
});
