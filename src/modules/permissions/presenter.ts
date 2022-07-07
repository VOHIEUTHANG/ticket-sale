import { PaginationEntity } from '@core/pagination/entity';
import store from '@core/store/redux';
import { OptionEntity } from '@core/table';
import permissionsStore from './permissitonsStore';
import * as permissionsRepository from './repository';

const permissionsPresenter = { ...permissionsRepository };

permissionsPresenter.getListPermissions = (
  pagination?: PaginationEntity,
  options?: OptionEntity,
) => {
  return permissionsRepository.getListPermissions(pagination, options).then(rs => {
    store.dispatch(permissionsStore.actions.setListPermissions(rs.data));
    return Promise.resolve(rs);
  });
};

export default permissionsPresenter;
