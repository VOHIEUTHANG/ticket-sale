import React, { memo } from 'react';
import BreadcrumbComponent from './BreadcumbComponent';
import TitleComponent from './TitleComponent/index';
import { IRouter } from '@routers/interface';

export interface IBreadcrumbs {
  name: string;
  href?: string;
}
interface Props {
  classTitle?: string;
  classBreadcrumbs?: string;
  title?: any;
  breadcrumbs?: IRouter | Array<IRouter>;
}

const MainTitleComponent = ({
  classTitle = '',
  classBreadcrumbs = '',
  title = '',
  breadcrumbs,
}: Props) => {
  let titleIn = '';
  if (title) {
    titleIn = title;
  } else {
    if (Array.isArray(breadcrumbs)) {
      const index = breadcrumbs.length - 1;
      titleIn = breadcrumbs[index]?.name || '';
    } else {
      titleIn = breadcrumbs?.name || '';
    }
  }
  return (
    <div className="main-title-breadcrumb__box">
      {breadcrumbs ? (
        <BreadcrumbComponent breadcrumbs={breadcrumbs} className={classBreadcrumbs} />
      ) : (
        ''
      )}
      <TitleComponent title={titleIn} className={classTitle} />
    </div>
  );
};

export default memo(MainTitleComponent);
