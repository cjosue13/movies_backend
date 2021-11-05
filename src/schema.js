import _ from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import utils from './utils';
import logger from './helpers/logger';

import date from './scalars/date';

const Schema = utils.import.globalSchema();
const Query = utils.import.querySchema();
const Mutation = utils.import.mutationSchema();

// Custom modules
const Movie = utils.import.all('movies');
const BudgetDetail = utils.import.all('budgetdetails');

export default makeExecutableSchema({
  typeDefs  : [Schema, Query, Mutation, Movie.schema, BudgetDetail.schema],
  resolvers : _.merge(date, Movie.resolver, BudgetDetail.resolver),
  logger    : { log : e => logger.log('info', e.stack) },
});
