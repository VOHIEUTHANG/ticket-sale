import React, { memo, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { privatePage } from '@routers/mainRouter';
import { IRouter } from '@routers/interface';
import CheckPermission from '@shared/hoc/CheckPermission';
import { logo } from '@shared/assets/images';
import { UilAngleRight } from '@iconscout/react-unicons';
import MenuItem from './ItemMenu';

interface IRenderMenuProps {
  listNav: Array<IRouter>;
  location: string;
}

const renderMenu: React.FC<IRenderMenuProps> = (props: IRenderMenuProps) => {
  const listNav = props.listNav.slice(1, props.listNav.length + 1);
  return (
    <>
      {listNav.map((item: IRouter, index) => {
        if (item.menu == null || item.menu?.hideInNavbar) {
          return <React.Fragment key={index}></React.Fragment>;
        } else if (item.permissionCode) {
          return (
            <CheckPermission permissionCode={item.permissionCode} key={index}>
              <MenuItem data={item} key={index} />
            </CheckPermission>
          );
        } else {
          return <MenuItem data={item} key={index} />;
        }
      })}
    </>
  );
};

const RenderMenu = memo(renderMenu);

const SiderComponent: React.FC<{
  className: string;
  setClassName: (className: string) => void;
}> = props => {
  const location = useLocation();
  const history = useHistory();
  const { className, setClassName } = props;
  const [width, setWidth] = useState<string | number>();
  const onClick = (e: any) => {
    setClassName('sider-component big');
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (className === 'sider-component') {
      setWidth(0);
    } else {
      setWidth('100%');
    }
  }, [className]);

  return (
    <div className={className} onClick={onClick}>
      <div className="icon">
        <UilAngleRight />
      </div>
      <div className="mask" style={{ width }}>
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => history.push('/')} />
        </div>
        <div className="menu">
          <RenderMenu listNav={privatePage} location={location.pathname} />
        </div>
      </div>
    </div>
  );
};

export default SiderComponent;
