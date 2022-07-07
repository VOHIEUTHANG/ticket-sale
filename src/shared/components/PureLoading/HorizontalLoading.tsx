import React from 'react';
import './HorizontalLoading.scss';
interface Props {
  color?: any;
}

const HorizontalLoading = (props: Props) => {
  return (
    <div className="lds-ellipsis lds-horizontal ">
      <div style={{ color: props.color || undefined }}></div>
      <div style={{ color: props.color || undefined }}></div>
      <div style={{ color: props.color || undefined }}></div>
      <div style={{ color: props.color || undefined }}></div>
    </div>
  );
};

export default HorizontalLoading;
