import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { UilAngleRight } from '@iconscout/react-unicons';
import { IRouter } from '@routers/interface';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { IBreadcrumbs } from '../inteface';

const BreadcrumbComponent: React.FC<IBreadcrumbs> = ({ breadcrumbs, className = '' }) => {
  const { formatMessage } = useAltaIntl();
  const renderBreadcrumbArray = () => {
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      return breadcrumbs.map((router: IRouter, index) => {
        const lastBreadcrumb = index + 1 === breadcrumbs.length;
        let classNameBreadcrumb = '';
        if (lastBreadcrumb) {
          classNameBreadcrumb = 'breadcrumb__last';
        }
        return (
          <React.Fragment key={index}>
            <span className="breadcrumb__icon">
              <Icon component={UilAngleRight} />
            </span>
            <span className={`breadcrumb__li ${classNameBreadcrumb} `}>
              <Link to={!lastBreadcrumb ? router.path : ''}>
                {router.name ? formatMessage(router.name) : 'unknown'}
              </Link>
            </span>
          </React.Fragment>
        );
      });
    } else {
      const router: any = breadcrumbs;
      return (
        <React.Fragment>
          <span className="breadcrumb__icon">
            <Icon component={UilAngleRight} />
          </span>
          <span className={'breadcrumb__li breadcrumb__last '}>
            <Link to={router.path}>{router.name ? formatMessage(router.name) : 'unknown'}</Link>
          </span>
        </React.Fragment>
      );
    }
  };
  return (
    <div className={`breadcrumb__box ${className}`}>
      <span className="breadcrumb__li">
        <Link to="/">{formatMessage('common.home')}</Link>
      </span>
      {renderBreadcrumbArray()}
    </div>
  );
};

export default memo(BreadcrumbComponent);
