import React, { memo, PropsWithChildren, useState } from 'react';

import HeaderComponent from './Header';
import SiderComponent from './Sidebar';

interface IDefaultLayoutProps {
  history: any;
}

const DefaultLayout: React.FC<PropsWithChildren<IDefaultLayoutProps>> = props => {
  const [menu, setMenu] = useState<string>('sider-component big');

  const onClick = (e: any): any => {
    const targetNode = e.target as HTMLDivElement;
    if (targetNode.className === 'main-component' || e.target === e.currentTarget) {
      setMenu('sider-component');
      return;
    }
    if (
      targetNode.tagName === 'INPUT' ||
      targetNode.tagName === 'BUTTON' ||
      targetNode.parentElement?.onclick !== null
    ) {
      return;
    }
    setMenu('sider-component');
  };

  return (
    <div className="all-page-component">
      <SiderComponent setClassName={setMenu} className={menu} />
      <div className="right-page-component" onClick={onClick}>
        <div className="w-100 d-flex flex-row-reverse">
          <HeaderComponent />
        </div>
        <div className="main-component">{props.children}</div>
      </div>
    </div>
  );
};

export default memo(DefaultLayout);
