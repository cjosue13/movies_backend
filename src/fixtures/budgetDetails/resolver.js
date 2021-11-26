import { getCardById } from '../cards/loader';
import {
  createBudgetDetail,
  getAllBudgetDetails,
  getBudgetDetailsbyCard,
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
  },
  Mutation : {
    createBudgetDetail (_, { budgetDetail }) {
      return createBudgetDetail(budgetDetail);
    },
    updateBudgetDetail (_, { budgetDetail }) {
      return updateBudgetDetail(budgetDetail);
    },
  },
};
