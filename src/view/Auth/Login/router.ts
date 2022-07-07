import { IRouter } from '@routers/interface';

export const routerLogin: IRouter = {
  path: '/login',
  loader: import('./index'),
  exact: true,
  masterLayout: false,
};
