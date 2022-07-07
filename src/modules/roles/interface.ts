export interface Permission {
  permissionCode: string;
  permissionName: string;
  level: number;
  createdAt: string;
}
export interface Role {
  roleId: string;
  roleName: string;
  roleCode: string;
  groupId: string;
  roleLevel: number;
  rolePermissions: string;
  permissions: string[];
  createAt: string;
}
export interface PermissionModule {
  module: string;
  permissions: Array<Permission>;
}
