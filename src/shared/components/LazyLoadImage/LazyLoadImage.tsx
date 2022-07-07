import React, { useState } from 'react';
import { Skeleton } from 'antd';
import './LazyLoadImage.scss';

interface IProps {
  src: string;
  alt: string;
}

const LazyLoadImage = (props: IProps) => {
  const [rendered, setRendered] = useState(true);

  return (
    <div className="lazyLoad-img">
      {rendered && (
        <Skeleton.Avatar
          className={'skeleton'}
          style={{ width: '100%', height: '100%' }}
          active={true}
          size={'small'}
          shape={'square'}
        />
      )}
      {props.src && (
        <img
          onLoad={() => {
            setRendered(false);
          }}
          style={{ maxWidth: '100%' }}
          src={props.src}
          alt={props.alt}
          className={`${rendered && 'd-none'}`}
        />
      )}
    </div>
  );
};

export default LazyLoadImage;
