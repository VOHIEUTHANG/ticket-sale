import React from 'react';

interface IProps {
  text: any;
  colorCode?: 'blue' | 'red' | 'grey' | 'green';
  className?: string;
}
const CircleLabel = ({ text, colorCode = 'blue', className }: IProps) => {
  const color = {
    blue: 'circle-time-left',
    red: 'circle-cancel',
    grey: 'circle-expired',
    green: 'circle-new',
  };
  return (
    <div className={` circle-label ${className}`}>
      <span className={`circle-status ${color[colorCode]}`}></span>
      <span>{text}</span>
    </div>
  );
};

export default CircleLabel;
