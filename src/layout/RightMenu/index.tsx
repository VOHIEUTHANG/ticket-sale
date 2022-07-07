import { Tooltip } from 'antd';
import React from 'react';
import * as Icon from 'react-feather';
import { useSelector } from 'react-redux';

import { IconBack } from '@assets/icon';
import { CheckPermissionFunc } from '@hoc/CheckPermission';
import { UilFileCheck, UilFileImport, UilShareAlt, UilTrash } from '@iconscout/react-unicons';
import { RootState } from '@modules';
import { useAltaIntl } from '@shared/hook/useTranslate';

const listIconType = {
  add: <Icon.Plus size="24" className="icon-feather" />,
  edit: <Icon.Edit size="24" className="icon-feather" />,
  delete: <UilTrash size="24" className="icon-feather red-icon" />,
  cancel: <Icon.X size="24" className="icon-feather red-icon" />,
  check: <Icon.Check size="24" className="icon-feather green-icon" />,
  'file-check': <UilFileCheck size="24" className="icon-feather green-icon" />,
  'file-back': <UilFileImport size="24" className="icon-feather" />,
  share: <UilShareAlt size="24" className="icon-feather" />,
  volume: <Icon.Volume2 size="24" className="icon-feather" />,
  refresh: <Icon.RefreshCw size="24" className="icon-feather" />,
  logOut: <Icon.LogOut size="24" className="icon-feather red-icon" />,
  key: <Icon.Key size="24" className="icon-feather" />,
  back: <IconBack size="24" className="icon-feather" />,
  goBack: <IconBack size="24" className="icon-feather" />,
  detail: <Icon.Info size="24" className="icon-feather" />,
  play: <Icon.Play size="24" className="icon-feather" />,
  minus: <Icon.Minus size="24" className="icon-feather" />,
  eye: <Icon.Eye size="24" className="icon-feather" />,
  eyeOff: <Icon.EyeOff size="24" className="icon-feather" />,
  addSchool: <Icon.FilePlus size="24" className="icon-feather" />,
};
export interface IArrayAction {
  icon?: any;
  name?: string;
  handleAction?: any;
  isAllow?: boolean;
  disable?: any;
  permissionCode?: string;
  iconType?: keyof typeof listIconType;
  imgIcon?: any;
  context?: any;
}

const RenderIcon = (item: IArrayAction) => {
  if (typeof item.icon === 'string') {
    return <i className={item.icon} aria-hidden="true" />;
  } else if (item.icon) {
    return item.icon;
  } else if (item.iconType) {
    return listIconType[item.iconType];
  } else if (item?.imgIcon) {
    return <img alt="img icon" src={item?.imgIcon} style={{ width: '25px' }} />;
  }
  return <></>;
};

const RenderItem = React.memo(({ item }: { item: IArrayAction }) => {
  const { formatMessage } = useAltaIntl();
  const title = formatMessage(item?.name || `common.${item.iconType}`);
  const onClick = (e: any) => {
    if (!item.disable && item.handleAction) {
      item.handleAction(item.context);
    }
    e.stopPropagation();
  };
  return (
    <Tooltip placement="left" title={title}>
      <span className={`item__icon ${item.disable ? 'no-click' : ''}`} onClick={onClick}>
        <RenderIcon {...item} />
      </span>
    </Tooltip>
  );
});

interface IPropsRightMenu {
  arrayAction?: Array<IArrayAction>;
}
const RightMenu = (props: IPropsRightMenu) => {
  const { arrayAction } = props;

  const listPermissionCode = useSelector((state: RootState) => state.profile.listPermissionCode);

  const RenderRightMenuContent = React.useMemo(() => {
    return (
      arrayAction &&
      arrayAction
        .filter(
          it =>
            it.isAllow !== false &&
            (it.permissionCode == null ||
              // eslint-disable-next-line @typescript-eslint/comma-dangle
              CheckPermissionFunc(it.permissionCode, listPermissionCode)),
        )
        .map((item, index) => {
          return <RenderItem key={index} item={item} />;
        })
    );
  }, [arrayAction, listPermissionCode]);
  if (RenderRightMenuContent && RenderRightMenuContent.length === 0) {
    return <></>;
  }
  return (
    <div className="right">
      <div className="right__menu__content">{RenderRightMenuContent}</div>
    </div>
  );
};

export default RightMenu;
