import React from 'react';
import { IRouter } from '@routers/interface';

export interface IBreadcrumbs {
  className?: any;
  breadcrumbs: IRouter[] | IRouter;
}
export interface ITitle {
  title: string | React.ReactNode;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  level?: 5 | 4 | 3 | 2 | 1;
}
