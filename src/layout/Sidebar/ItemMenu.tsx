import { IRouter } from '@routers/interface';
import { Dropdown, Menu } from 'antd';
import React, { useMemo, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { matchPath, useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { UilEllipsisV } from '@iconscout/react-unicons';

interface IMenu {
  data: IRouter;
  activePath?: string;
}

const SubItem: React.FC<IMenu> = (props: IMenu) => {
  const item = props.data;
  const history = useHistory();
  const menuRouters = item.routes?.filter(rs => rs.menu && !rs.menu?.hideInNavbar) || [];

  return (
    <Menu mode="vertical" className="dropdown-3dot">
      {menuRouters.map((linkNav: IRouter, index: number) => {
        let active = '';
        if (linkNav.menu?.activePath != null) {
          const activeMenu = props.activePath?.match(linkNav.menu.activePath);
          if (activeMenu) {
            active = 'ant-menu-item-selected';
          }
        }

        let path = linkNav.path;
        if (linkNav.menu?.generatePath) {
          path = linkNav.menu.generatePath(undefined);
        }
        return (
          <Menu.Item
            className={active}
            key={index}
            onClick={() => {
              history.push(path);
            }}
          >
            <FormattedMessage id={linkNav.name} defaultMessage={linkNav.name} />
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const Item: React.FC<IMenu> = (props: IMenu) => {
  const item = props.data;
  const location = useLocation();
  const activePath = item.menu?.activePath;
  const active = useMemo(() => {
    if (activePath) {
      const activeMenu = location.pathname.match(activePath);
      return activeMenu ? 'menu-active' : '';
    }
    return matchPath(location.pathname, { path: item.path, exact: item.exact })
      ? 'menu-active'
      : '';
  }, [item.exact, activePath, item.path, location.pathname]);
  let path = item.path;
  if (item.menu?.generatePath) {
    path = item.menu.generatePath(undefined);
  }
  const subMenu = item.routes?.filter(r => r.menu != null && !r.menu?.hideInNavbar);
  if (subMenu && subMenu.length > 0) {
    return (
      <div className={`menu--component--item three-dot ${active}`} key={item.path}>
        <div className="item-label">
          <span>
            {item.menu?.icon && <span className="item-hover__icon">{item.menu.icon}</span>}
            <a className="item__nav">
              <FormattedMessage id={item.name} defaultMessage={item.name} />
            </a>
          </span>

          <Dropdown
            overlay={<SubItem data={item} activePath={location.pathname} />}
            placement="bottomLeft"
            trigger={['hover']}
          >
            <span className="icon-3dot">
              <UilEllipsisV />
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }

  return (
    <div className={`menu--component--item ${active}`}>
      <Link to={path} className="item-label">
        <span>
          {item.menu?.icon && <span className="item-hover__icon">{item.menu.icon}</span>}
          <span className="item__nav">
            <FormattedMessage id={item.name} defaultMessage={item.name} />
          </span>
        </span>
      </Link>
    </div>
  );
};

export default memo(Item);
