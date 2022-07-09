import React from 'react';
import './Tag.scss';
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

const Tag = ({ children, color }: { children: string; color: Color }) => {
  let bgColor: Color = '#fff';
  switch (color) {
    case '#919DBA':
      bgColor = '#EAF1F8';
      break;
    case '#03AC00':
      bgColor = '#DEF7E0';
      break;
    case '#FD5959':
      bgColor = '#F8EBE8';
      break;
  }

  return (
    <div className="tag " style={{ borderColor: color, color, backgroundColor: bgColor }}>
      <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4.5" r="4" fill={color} />
      </svg>
      <span className="text-style-tag">{children}</span>
    </div>
  );
};

export default Tag;
