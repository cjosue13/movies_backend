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

function getBudgetDetailsbyCard (card) {
  return BudgetDetail.query(q =>
    q.where({
      card,
    }))
    .fetchAll()
    .then(budgetDetail => (budgetDetail && budgetDetail.toJSON()) || []);
}

function getBudgetDetailsbyTypeAndUser (input) {
  return BudgetDetail.query(q => q
    .leftJoin('cards', 'cards.id', 'budgetdetails.card')
    .where({ 'budgetdetails.bd_type' : input.bd_type, 'cards.usu_uid' : input.usu_uid })
    .distinct('budgetdetails.*'))
    .fetchAll().then(budget => (budget && budget.toJSON()) || []);
}

export { createBudgetDetail, getAllBudgetDetails, updateBudgetDetail, getBudgetDetailsbyCard, getBudgetDetailsbyTypeAndUser };
