import { Tooltip } from 'antd';
import React from 'react';
import './styles.scss';

interface Props {
  text: string | number | React.ReactElement;
  style?: React.CSSProperties;
  className?: any;
  noShowTooltip?: boolean;
  tooltip?: string;
}
const RenderText = ({ content, className, style }) => {
  return (
    <p className={`content ${className ? className : ''}`} style={style}>
      {content ? content : '-'}
    </p>
  );
};

const TextComponent = (props: Props) => {
  if (props.noShowTooltip) {
    return <RenderText content={props.text} style={props.style} className={props.className} />;
  }
  return (
    <Tooltip title={props.text} placement="bottomLeft">
      <RenderText content={props.text} style={props.style} className={props.className} />
    </Tooltip>
  );
};

export default React.memo(TextComponent);
