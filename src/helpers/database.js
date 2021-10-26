// Knexfile with connection string
export const knexfile = require('../../knexfile');

// Knex object, you can execute queries with this object
// more details: http://knexjs.org/
export const knex = require('knex')(knexfile);

// Connect knex with bookshelf ORM
// more details: http://bookshelfjs.org/
export const bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-paranoia'), {
  events : {
    saving   : true,
    updating : true,
    saved    : true,
    updated  : true
  }
});
