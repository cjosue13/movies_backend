import { getBudgetDetailsbyCard } from '../budgetDetails/loader';
import { createCard, getCardsByUser, updateCard } from './loader';


export default {
  Card : {
    Budgets : Card => getBudgetDetailsbyCard(Card.id)
  },
  Query : {
    getCardsByUser (_, { usu_uid }) {
      return getCardsByUser(usu_uid);
    },
  },
  Mutation : {
    createCard (_, { card }) {
      console.log('APSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
      return createCard(card);
    },
    updateCard (_, { card }) {
      return updateCard(card);
    },
  },
};
