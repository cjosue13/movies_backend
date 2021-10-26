import checkit from 'checkit';
import { knex } from './database';

export default checkit.Validator.unique = (value, { table, column, message }) =>
  knex(table).where(column, '=', value).count(`${column} as count`).then(data => {
    if (data.shift().count >= 1) throw new Error(message);
  });

