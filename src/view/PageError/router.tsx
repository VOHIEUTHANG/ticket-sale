import { IRouter } from '@routers/interface';

export const routerPageError: IRouter = {
  path: '*',
  masterLayout: false,
  loader: import('@view/PageError'),
};
