const dotenv = require('dotenv');

dotenv.config({ silent : true });
dotenv.load();

module.exports = {
  client     : 'mysql2',
  debug      : process.env.DB_DEBUG === 'true', // dotenv doesn't cast to boolean values :(
  connection : {
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    // socketPath : process.env.DB_SOCKET_PATH,
  },
};
