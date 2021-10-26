import Installer from './helpers/Installer';

console.time('Time execution'); // eslint-disable-line no-console

(new Installer()).run()
  .then(() => console.log('Success')) // eslint-disable-line no-console
  .catch(e => console.warn(e.stack)) // eslint-disable-line no-console
  .finally(() => {
    console.timeEnd('Time execution'); // eslint-disable-line no-console
    process.exit(0);
  });

