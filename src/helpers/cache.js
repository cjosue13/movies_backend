import EventEmitter from 'events';

export default class Cache extends EventEmitter {
  constructor (name, method, options = {}) {
    super();
    // Define the name of the key on Redis
    this.name = name;

    // Define the method to execute
    this.method = method;

    // Define the amount of seconds of ttl
    this.ttl = options.ttl || 86400;

    // Allow null values
    this.allowNull = options.allowNull || false;

    this.on('clear', id => {
      if (id) { return this.clear(id); }
    });
  }

  // Define the key based on the name of the object and the unique id used
  set key (keyName) {
    this._key = keyName || 'all';
  }

  // Return the composed key
  get key () {
    return `${this.name}:${this._key}`;
  }

  // Determine if the data should be returned by the cache or should
  // execute a request to retrieve the data first
  async _getFromCacheOrDatabase (key, cache) {
    // If cache exists, return it
    if (cache) return JSON.parse(cache);

    // If cache doesn't exists, execute the query
    const result = await this._exec(key);
    if (result) {
      return JSON.parse(result);
    }
  }

  // Execute the query then place its return data
  _exec (key) {
    return this.method(key)
      .then(data => {
        if (data || this.allowNull) {
          return this._place(key, JSON.stringify(data));
        }
      });
  }

  // Clear and load
  refresh (keyName) {
    return this.clear(keyName)
      .then(() => this.load(keyName));
  }
}
