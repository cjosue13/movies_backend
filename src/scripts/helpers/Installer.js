import { spawn } from 'child_process';
import Promise from 'bluebird';

import { knex } from '../../src/helpers/database';
import user from '../../src/fixtures/user/resolver';

export default class Installer {
  constructor() {
    // eslint-disable-next-line no-console
    console.log('Development Setup:');

    if (!['testing', 'staging', 'production'].includes(process.argv[2])) {
      throw new Error('Must indicate the stage to install: `yarn setup [environment]`. ' +
        'Available stages: testing, staging or production');
    }

    // eslint-disable-next-line prefer-destructuring
    this.stage = process.argv[2];
  }

  log(str) {
    const txt = `... ${str}:`;
    return process.stdout.write(`${txt}${' '.repeat(35 - txt.length)}`);
  }

  npmRun(script, args) {
    const debugMode = process.argv[3] === '--logs' ? { stdio: ['inherit', 'inherit'] } : {};
    return new Promise((resolve, reject) => spawn('npm', ['run', script, args], debugMode)
      .on('error', reject)
      .on('exit', resolve));
  }

  async dropForeigns() {
    const keys = await knex.select(knex.raw('CONSTRAINT_NAME AS name, TABLE_NAME AS table_name'))
      .from('information_schema.table_constraints')
      .where('CONSTRAINT_TYPE', 'FOREIGN KEY')
      .where('CONSTRAINT_SCHEMA', knex.raw('DATABASE();'));

    return Promise.map(keys, key => knex.raw(`ALTER TABLE ${key.table_name} DROP FOREIGN KEY ${key.name}`));
  }

  async dropSchemas() {
    const tables = await knex.select(knex.raw('TABLE_NAME AS name'))
      .from('information_schema.tables')
      .where('table_schema', knex.raw('DATABASE();'));
    return Promise.map(tables, table => knex.schema.dropTableIfExists(table.name));
  }

  dropAllTables() {
    this.log('Dropping all the tables');

    return Promise.resolve()
      .then(() => this.dropForeigns())
      .then(() => this.dropSchemas())
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  runMigrations() {
    this.log('Running migrations');

    return this.npmRun('migrate:latest')
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  importSchema() {
    this.log(`Import schema (${this.stage})`);
    return this.npmRun('import:schema', this.stage)
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  importProcedures() {
    this.log('Import procedures');

    return this.npmRun('import:procedures')
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  importViews() {
    this.log('Import views');

    return this.npmRun('import:views')
      .finally(() => console.log('\u2713'));
  }

  dbSeed() {
    this.log('DB Seeding');

    return this.npmRun('db:seed')
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  clearCache() {
    this.log('Clearing cache');

    return this.npmRun('clear:cache')
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  async generatePassword() {
    this.log('Generating passwords');

    const ids = await knex.select('id').from('user');

    return Promise.map(ids, u => user.Mutation.updateUser(null, {
      id: u.id,
      user: { password: 'Test123!' },
    }))
      .finally(() => console.log('\u2713')); // eslint-disable-line no-console
  }

  run() {
    return Promise.resolve()
      .then(() => this.dropAllTables())
      .then(() => this.importSchema())
      .then(() => this.runMigrations())
      .then(() => this.importProcedures())
      .then(() => this.importViews())
      .then(() => this.clearCache());
  }
}
