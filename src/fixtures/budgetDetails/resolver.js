import { getCardById } from '../cards/loader';
import {
  createBudgetDetail,
  getAllBudgetDetails,
  getBudgetDetailsbyCard,
  getBudgetDetailsbyTypeAndUser,
  updateBudgetDetail,
} from './loader';

export default {
  BudgetDetail : {
    Card : BudgetDetail => getCardById(BudgetDetail.card)
  },
  Query : {
    getBudgetDetails () {
      return getAllBudgetDetails();
    },
    getBudgetDetailsbyCard (_, { card }) {
      return getBudgetDetailsbyCard(card);
    },
    getBudgetDetailsbyTypeAndUser (_, { input }) {
      return getBudgetDetailsbyTypeAndUser(input);
    }
  },
  Mutation : {
    createBudgetDetail (_, { budgetDetail }) {
      return createBudgetDetail(budgetDetail);
    },
    updateBudgetDetail (_, { input }) {
      return updateBudgetDetail(input);
    },
  },
};
