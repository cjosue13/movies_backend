import Movies from './model';

async function createMovie (movie) {
  return new Movies({ ...movie }, { hasTimestamps : true }).save();
}

async function updateMovie (movie) {
  return Movies.forge(movie.id, { hasTimestamps : true }).save(
    { ...movie },
    { patch : true }
  );
}

function getAllMovies () {
  return Movies.fetchAll().then(movie => (movie && movie.toJSON()) || null);
}

export { createMovie, getAllMovies, updateMovie };
