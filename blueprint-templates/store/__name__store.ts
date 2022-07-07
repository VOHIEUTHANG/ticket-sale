import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {{name}}Entity from './entity';

interface I{{pascalCase name}}Store {
  list{{pascalCase name}}?: Array<{{name}}Entity>
}

const {{name}}Store = createSlice({
  name: '{{name}}Store',
  initialState: {
    list{{pascalCase name}}: [],
  } as I{{pascalCase name}}Store,
  reducers: {
    setList{{pascalCase name}}: (state, action: PayloadAction<Array<{{name}}Entity>>) => {
      return Object.assign({},state,{list{{pascalCase name}}:action.payload})
    },
  },
});

export const {
  setList{{pascalCase name}},
} = {{name}}Store.actions;

export default {{name}}Store;
