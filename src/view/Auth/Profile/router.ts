import { IRouter } from '@routers/interface';

export const routerViewProfile: IRouter = {
  path: '/profile',
  name: 'profile.name',
  loader: import('./index'),
  exact: true,
  masterLayout: false,
};
