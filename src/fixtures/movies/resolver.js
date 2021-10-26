import { createMovie, getAllMovies, updateMovie } from './loader';

export default {

  Query : {
    getMovies () {
      return getAllMovies();
    },
  },
  Mutation : {
    createMovie (_, { movie }) {
      return createMovie(movie);
    },
    updateMovie (_, { movie }) {
      return updateMovie(movie);
    },
  },
};
