import _ from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import utils from './utils';
import logger from './helpers/logger';

import date from './scalars/date';

const Schema = utils.import.globalSchema();
const Query = utils.import.querySchema();
const Mutation = utils.import.mutationSchema();

// Custom modules
const BudgetDetail = utils.import.all('budgetdetails');
const Card = utils.import.all('cards');
export default makeExecutableSchema({
  typeDefs  : [Schema, Query, Mutation, BudgetDetail.schema, Card.schema],
  resolvers : _.merge(date, BudgetDetail.resolver, Card.resolver),
  logger    : { log : e => logger.log('info', e.stack) },
});
