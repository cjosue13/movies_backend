export default class Entity {
  // Entity handles the data of each module
  // in order to provide an easy way to extract fields
  // required to interact with the Cache Manager
  constructor (module) {
    this._cache = {};
    this._module = module;
  }

  // Fetch the node, basically we retrieve the entire module and we
  // determine if which field is required to clear the "loader" (Cache Manager)
  fetch (context, model) {
    this._model = model.clone();

    const attributes = this._model.pick(['id']);

    return new this._module(attributes).fetch({ patch : true })
      .then(entity => {
        this._cache = entity && entity.has('id') ? entity.toJSON() : {};
      });
  }

  // Return a boolean if there's values on cache
  exists () {
    return Object.keys(this._cache).length > 0;
  }

  // Return the entities
  entries () {
    return this._cache;
  }
}
