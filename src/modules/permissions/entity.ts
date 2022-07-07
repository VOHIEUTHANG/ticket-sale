import moment from 'moment';

class PermissionsEntity {
  createdAt = '';

  permissionCode = '';

  permissionName = '';

  constructor(permissions: Partial<PermissionsEntity>) {
    if (!permissions) {
      return;
    }
    Object.assign(this, permissions);
    this.createdAt = permissions.createdAt
      ? moment(permissions.createdAt).format('DD/MM/YYYY')
      : '';
  }

  static createListPermissions(listPermissions: Array<Partial<PermissionsEntity>>) {
    if (!Array.isArray(listPermissions)) {
      return [];
    }
    return listPermissions.map((permissions: Partial<PermissionsEntity>) => {
      return new PermissionsEntity(permissions);
    });
  }
}
export default PermissionsEntity;
