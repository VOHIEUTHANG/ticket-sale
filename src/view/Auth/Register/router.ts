import { IRouter } from '@routers/interface';

export const routerRegister: IRouter = {
  path: '/register',
  loader: import('./index'),
  exact: true,
};
