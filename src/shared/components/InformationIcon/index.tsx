import { Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Info } from 'react-feather';
interface IProps {
  onClick?: () => void;
  disable?: boolean;
}
const InformationIconComponent = (props: IProps) => {
  const intl = useIntl();
  const onClick = e => {
    if (props?.onClick) {
      props?.onClick();
    }
    e.stopPropagation();
  };

  if (props?.disable) {
    return <></>;
  }
  return (
    <Tooltip title={intl.formatMessage({ id: 'common.info' })}>
      <Info
        className={`icon-edit ${props?.disable ? 'icon-disable' : ''}`}
        size={19}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default InformationIconComponent;
