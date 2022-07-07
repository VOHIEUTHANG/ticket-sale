import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

import { IRouter } from '@routers/interface';
import TitleComponent from '@shared/components/MainTitleComponent/TitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';

interface PropsNavBar {
  classTitle?: string;
  classBreadcrumbs?: string;
  title?: string;
  activeClass?: string;
  routerSentTo?: Array<IRouter>;
}

function Navbar({ classTitle = '', routerSentTo }: PropsNavBar) {
  const location = useLocation();
  const { formatMessage } = useAltaIntl();
  const nameActive = React.useMemo(() => {
    const routerActive = routerSentTo?.filter(r => r.path === location.pathname);
    if (routerActive && routerActive?.length > 0) {
      return routerActive[0].name;
    }
    return undefined;
  }, [location, routerSentTo]);

  return (
    <div className="navBar">
      <div className="tittle">
        <TitleComponent title={nameActive} className={classTitle} />
      </div>
      <div className="navBar-menu">
        {routerSentTo?.map((r, i) => {
          if (r.menu == null) {
            return <></>;
          }
          if (r.external === true) {
            return (
              <a href={r.path} className="navBar-menu-item" key={i}>
                {r.menu?.icon}
                <span>{formatMessage(r.menu?.content || r.name || '')}</span>
              </a>
            );
          }
          return (
            <NavLink to={r.path} className="navBar-menu-item" key={i}>
              {r.menu?.icon} <span>{formatMessage(r.menu?.content || r.name || '')}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
