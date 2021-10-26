import checkit from 'checkit';
import { bookshelf } from '../../helpers/database';
import Entity from '../../helpers/entity';

export default class Movies extends bookshelf.Model {
  get tableName () {
    return 'movies';
  }

  initialize () {
    this.entity = new Entity(Movies);

    this.on('saving', this.validate);

    // Clear cache
    this.on('updating', this.entity.fetch.bind(this.entity, arguments));
    this.on('destroying', this.entity.fetch.bind(this.entity, arguments));
  }

  get validations () {
    return {
      insert : {
        title       : ['required'],
        year        : ['required'],
        description : ['required'],
        image       : ['required'],
      },
      update : {
        title       : ['required'],
        year        : ['required'],
        description : ['required'],
        image       : ['required'],
      },
    };
  }

  validate (model, attrs, options) {
    return checkit(options.method === 'update'
      ? this.validations.update
      : this.validations.insert).run(this.toJSON());
  }
}
