import UserEntity from '@modules/user/entity';
import moment from 'moment';

class RoleEntity {
  id = '';

  roleName?: string;

  rolePermissions?: [];

  user?: UserEntity;

  createdAt = '';

  constructor(role?: any) {
    if (!role) {
      return;
    }
    Object.assign(this, role);
    this.createdAt = role.createdAt ? moment(role.createdAt).format('DD/MM/YYYY') : '';
  }

  static createListRole(listRole: Array<any>) {
    if (!Array.isArray(listRole)) {
      return [];
    }
    return listRole.map((Role: RoleEntity) => {
      return new RoleEntity(Role);
    });
  }
}

export default RoleEntity;
