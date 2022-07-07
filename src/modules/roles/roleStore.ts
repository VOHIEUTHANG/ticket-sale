import { removeProfile } from '@modules/authentication/profileStore';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PermissionModule, Role } from './interface';

export interface RoleStore {
  status: 'init' | 'modified' | 'success';
  listPermission?: Array<PermissionModule>;
  listRole?: Role[];
  roleEdited: any;
  checkedListPermission?: any[];
}

const initialState: RoleStore = {
  status: 'init',
  listPermission: [],
  listRole: [],
  roleEdited: null,
  checkedListPermission: [],
};
export const incrementBy = createAction<number>('incrementBy');
const roleStore = createSlice({
  name: 'RoleStore',
  initialState: initialState,
  reducers: {
    getListRole: (
      state: RoleStore,
      action: PayloadAction<{
        data: Array<Role>;
      }>,
    ) => {
      return { ...state, listRole: action.payload.data };
    },
  },
  extraReducers: builder => {
    builder.addCase(removeProfile, state => {
      return { ...state, status: 'init', listPermission: [] };
    });
  },
});

export default roleStore;
