import { IRouter } from '@routers/interface';
export const router{{pascalCase name}}: IRouter = {
  path: '/{{kebabCase name}}',
  loader: import('./index'),
  exact: true,
  name: '{{camelCase name}}.name', //translate here for breadcrumb and sidebar
};