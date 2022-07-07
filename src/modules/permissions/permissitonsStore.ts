import { RootState } from '@modules';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import PermissionsEntity from './entity';

interface IPermissionsStore {
  listPermissions?: Array<PermissionsEntity>;
}

const permissionsStore = createSlice({
  name: 'permissionsStore',
  initialState: {
    listPermissions: undefined,
  } as IPermissionsStore,
  reducers: {
    setListPermissions: (state, action: PayloadAction<Array<PermissionsEntity>>) => {
      return Object.assign(state, { listPermissions: action.payload });
    },
  },
});

export const { setListPermissions } = permissionsStore.actions;

interface IPermission {
  listPermissions: PermissionsEntity[];
}

export const PermissionSelector: Selector<RootState, IPermission> = state => {
  return {
    listPermissions: state.permissionStore.listPermissions || [],
  };
};

export default permissionsStore;
