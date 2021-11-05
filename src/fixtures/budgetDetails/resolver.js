import {
  createBudgetDetail,
  getAllBudgetDetails,
  getBudgetDetailsbyUser,
  updateBudgetDetail,
} from './loader';

export default {
  Query : {
    getBudgetDetails () {
      return getAllBudgetDetails();
    },
    getBudgetDetailsbyUser (_, { usu_uid }) {
      return getBudgetDetailsbyUser(usu_uid);
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
