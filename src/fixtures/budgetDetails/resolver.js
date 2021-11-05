import {
  createBudgetDetail,
  getAllBudgetDetails,
  updateBudgetDetail,
} from './loader';

export default {
  Query : {
    getBudgetDetails () {
      return getAllBudgetDetails();
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
