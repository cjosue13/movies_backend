// Permissions error, defined in ACL
export class PermissionsError extends Error {
  constructor (message) {
    super(message);
    this.message = message;
    this.code = 401;
  }
}

// URL error, is not embeddable
export class EmbedError extends Error {
  constructor (message) {
    super(message);
    this.message = message;
    this.code = 418;
  }
}
