import React from 'react';
import './styles.scss';

interface Props {
  text: string;
  style?: React.CSSProperties;
  className?: any;
  bold?: boolean;
}

const LabelComponent = (props: Props) => {
  const { bold = true } = props;
  return (
    <div
      className={`label--component ${props.className ? props.className : ''}`}
      style={{ ...props.style, fontWeight: bold ? 'bold' : 400 }}
    >
      {props.text}:
    </div>
  );
};

export default LabelComponent;
