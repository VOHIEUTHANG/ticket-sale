import { PaginationEntity } from 'src/core/pagination/entity';
import httpRepository from 'src/core/repository/http';
import { OptionEntity, TableEntity } from 'src/core/table';

import PermissionsEntity from './entity';

// API GET
export const getListPermissions = (
  pagination?: PaginationEntity,
  options?: OptionEntity,
): Promise<{ data: PermissionsEntity[]; info: PaginationEntity }> => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/Permissions',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      return {
        data: PermissionsEntity.createListPermissions(res?.pagedData),
        info: new PaginationEntity(res?.pageInfo),
      };
    },
  });
};
//and get detail
export const getDetailPermissions = (id: string) => {
  return httpRepository.execute({
    path: '/api/permissions/' + id,
    showSuccess: false,
    showError: false,
    convert: res => {
      return new PermissionsEntity(res);
    },
  });
};

//API ADD
export const createPermissions = (payload: any) => {
  return httpRepository.execute({
    path: '/api/permissions',
    method: 'post',
    payload,
  });
};

//API EDIT/UPDATE
export const updatePermissions = (id: string, payload: any) => {
  return httpRepository.execute({
    path: '/api/permissions/' + id,
    method: 'put',
    payload,
  });
};

//API DELETE
export const deletePermissions = (id: string) => {
  return httpRepository.execute({
    path: '/api/permissions/' + id,
    method: 'delete',
  });
};
