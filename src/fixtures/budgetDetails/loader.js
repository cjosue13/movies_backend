import BudgetDetail from './model';

async function createBudgetDetail (budgetDetail) {
  return new BudgetDetail({ ...budgetDetail }, { hasTimestamps : true }).save();
}

async function updateBudgetDetail (budgetDetail) {
  return BudgetDetail.forge(budgetDetail.id, { hasTimestamps : true }).save(
    { ...budgetDetail },
    { patch : true }
  );
}

function getAllBudgetDetails () {
  return BudgetDetail.fetchAll().then(budgetDetail => (budgetDetail && budgetDetail.toJSON()) || null);
}

function getBudgetDetailsbyUser (usu_uid) {
  return BudgetDetail.query(q =>
    q.where({
      usu_uid,
    }))
    .fetchAll()
    .then(budgetDetail => (budgetDetail && budgetDetail.toJSON()) || []);
}

export { createBudgetDetail, getAllBudgetDetails, updateBudgetDetail, getBudgetDetailsbyUser };
