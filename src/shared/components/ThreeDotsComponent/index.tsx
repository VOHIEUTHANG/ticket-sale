import React, { useCallback } from 'react';
import { Dropdown, Button, Menu } from 'antd';

interface Iprops {
  arrayAction?: Array<{
    icon: string;
    name: string;
    color: string;
    key: string;
    isAllow?: boolean;
  }>;
  rotate: any;
  handleAction?: (item: any, data?: any) => void;
  dataAction?: any;
}

const ThreeDotsComponent = ({ arrayAction, handleAction, dataAction, rotate }: Iprops) => {
  const changeAction = useCallback(
    item => {
      handleAction!(item, dataAction);
    },
    [dataAction, handleAction],
  );

  const menu = (
    <Menu className="dropdown-menu">
      {arrayAction?.map(item => {
        if (!item || item.isAllow === false) {
          return;
        }
        return (
          <Menu.Item onClick={() => changeAction(item)}>
            <a>
              <i className={item.icon} aria-hidden="true" style={{ color: item.color }} />
              <span>{item.name}</span>
            </a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div className="threeDots">
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']} className="three-dots">
        <Button>
          <i
            style={{ transform: `rotate(${rotate}deg)` }}
            className="fa fa-ellipsis-h"
            aria-hidden="true"
          />
        </Button>
      </Dropdown>
    </div>
  );
};

function areEqual(prevProps: any, nextProps: any) {
  if (
    prevProps.dataAction !== nextProps.dataAction ||
    prevProps.arrayAction !== nextProps.arrayAction
  ) {
    return false;
  }
  return true;
}

export default React.memo(ThreeDotsComponent, areEqual);
