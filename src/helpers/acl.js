import auth from './auth';
import { PermissionsError } from '../errors';

export default {

  permissions : [],

  async checkPermissions () {
    const user = await auth.getUserFromToken();
    if (this.permissions.some(p => !user.role.permissions[p])) {
      throw new PermissionsError('User does not have sufficient permissions to access this area');
    }

    return user;
  }
};
