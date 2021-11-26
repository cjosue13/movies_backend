import Card from './model';

async function createCard (card) {
  return new Card({ ...card }, { hasTimestamps : true }).save();
}

async function updateCard (card) {
  return Card.forge(card.id, { hasTimestamps : true }).save(
    { ...card },
    { patch : true }
  );
}

/* function getAllBudgetDetails () {
  return Card.fetchAll().then(budgetDetail => (budgetDetail && budgetDetail.toJSON()) || null);
} */

function getCardsByUser (usu_uid) {
  return Card.query(q =>
    q.where({
      usu_uid,
    }))
    .fetchAll()
    .then(card => (card && card.toJSON()) || []);
}

function getCardById (id) {
  return Card.where({ id })
    .fetch()
    .then(card => (card && card.toJSON()) || null);
}

export { createCard, updateCard, getCardsByUser, getCardById };
