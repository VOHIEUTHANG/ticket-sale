import { PaginationEntity } from '@core/pagination/entity';
import httpRepository from '@core/repository/http';
import UserEntity, { AccountPermissionEntity } from '@modules/user/entity';

const addUser = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users',
    method: 'post',
    payload,
    config: { isPrivate: true },
  });
};
const updateUser = (id: string, payload: any) => {
  return httpRepository.execute({
    path: `/api/Users/${id}`,
    method: 'put',
    payload,
    config: { isPrivate: true, isFormData: true },
  });
};

const deleteUser = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Accounts/DeleteMany',
    method: 'post',
    payload,
    config: { isPrivate: true },
  });
};

const getUser = (params: any) => {
  return httpRepository
    .execute({
      path: '/api/Accounts',
      params,
      showError: false,
      showSuccess: false,
    })
    .then((dataListGroup: any) => {
      return Promise.resolve({
        data: UserEntity.createArrayUser(dataListGroup.pagedData),
        info: new PaginationEntity(dataListGroup.pageInfo),
      });
    });
};

const getDetailUser = (params: any) => {
  return httpRepository.execute({
    path: `/api/Accounts/${params}`,
    showError: false,
    showSuccess: false,
    convert: res => new UserEntity(res),
  });
};

const getPermission = () => {
  return httpRepository.execute({
    path: '/api/Permissions',
    showSuccess: false,
    convert: res => AccountPermissionEntity.createlistPermisison(res),
  });
};

export default {
  getDetailUser,
  addUser,
  updateUser,
  deleteUser,
  getPermission,
  getUser,
};
