import moment from 'moment';

export class AccountPermissionEntity {
  accountPermissionId: string = '';

  permissionCode = '';

  accountId = '';

  accountPermissionCreateAt = '';

  constructor(permission: Partial<AccountPermissionEntity>) {
    if (!permission) {
      return;
    }
    Object.assign(this, permission);
  }

  static createlistPermisison(list?: Array<Partial<AccountPermissionEntity>>) {
    if (list === undefined) {
      return undefined;
    }
    return list.map(ll => {
      return new AccountPermissionEntity(ll);
    });
  }
}
class UserEntity {
  userName = '';

  userFullName = '';

  email = '';

  permissions: AccountPermissionEntity[] = [];

  id = '';

  createdAt = '';

  updateAt = '';

  roleId?: any;

  role?: any;

  avatar?: string = '';

  constructor(user?: Partial<UserEntity>) {
    if (!user) {
      return;
    }
    Object.assign(this, user);
    this.permissions = AccountPermissionEntity.createlistPermisison(user?.permissions) || [];
    this.createdAt = user?.createdAt ? moment(user?.createdAt).format('DD/MM/YYYY HH:mm:ss') : '';

    this.updateAt = user?.updateAt ? moment(user?.createdAt).format('DD/MM/YYYY HH:mm:ss') : '';
  }

  static createArrayUser(arrUser: Array<Partial<UserEntity>>): Array<UserEntity> {
    if (!arrUser) {
      return [];
    }
    return arrUser.map(x => new UserEntity(x));
  }
}

export default UserEntity;
