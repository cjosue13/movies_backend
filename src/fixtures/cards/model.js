import checkit from 'checkit';
import { bookshelf } from '../../helpers/database';
import Entity from '../../helpers/entity';

export default class Card extends bookshelf.Model {
  get tableName () {
    return 'cards';
  }

  initialize () {
    this.entity = new Entity(Card);

    this.on('saving', this.validate);

    // Clear cache
    this.on('updating', this.entity.fetch.bind(this.entity, arguments));
    this.on('destroying', this.entity.fetch.bind(this.entity, arguments));
  }

  get validations () {
    return {
      insert : {
        usu_uid     : ['required'],
        name        : ['required'],
        type        : ['required'],
        description : ['required'],

      },
      update : {
        usu_uid     : ['required'],
        name        : ['required'],
        type        : ['required'],
        description : ['required'],
      },
    };
  }

  validate (model, attrs, options) {
    return checkit(options.method === 'update'
      ? this.validations.update
      : this.validations.insert).run(this.toJSON());
  }
}
