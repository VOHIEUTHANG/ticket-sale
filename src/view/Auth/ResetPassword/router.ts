import { IRouter } from '@routers/interface';

export const routerResetPassword: IRouter = {
  path: '/reset-password/:token',
  loader: import('./index'),
  exact: true,
};
