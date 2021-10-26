const Promise = require('bluebird');

const job = process.argv[2];
const { task } = require(`../src/jobs/${job}`); // eslint-disable-line

Promise.resolve()
  .then(task.onTick)
  .finally(() => {
    console.log('Job completed!');
    process.exit(0);
  });
