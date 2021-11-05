import checkit from 'checkit';
import { bookshelf } from '../../helpers/database';
import Entity from '../../helpers/entity';

export default class BudgetDetail extends bookshelf.Model {
  get tableName () {
    return 'budgetdetails';
  }

  initialize () {
    this.entity = new Entity(BudgetDetail);

    this.on('saving', this.validate);

    // Clear cache
    this.on('updating', this.entity.fetch.bind(this.entity, arguments));
    this.on('destroying', this.entity.fetch.bind(this.entity, arguments));
  }

  get validations () {
    return {
      insert : {
        usu_uid          : ['required'],
        bd_description   : ['required'],
        bd_paymentType   : ['required'],
        bd_paymentAmount : ['required'],
        bd_date          : ['required'],
        bd_type          : ['required'],
      },
      update : {
        usu_uid          : ['required'],
        bd_description   : ['required'],
        bd_paymentType   : ['required'],
        bd_paymentAmount : ['required'],
        bd_date          : ['required'],
        bd_type          : ['required'],
      },
    };
  }

  validate (model, attrs, options) {
    return checkit(options.method === 'update'
      ? this.validations.update
      : this.validations.insert).run(this.toJSON());
  }
}
