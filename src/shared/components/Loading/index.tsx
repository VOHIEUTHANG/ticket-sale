import './loading.scss';

import { Spin } from 'antd';
import * as React from 'react';

const Loading = () => {
  return (
    <div className="vertical-centered-box d-flex align-items-center justify-content-center">
      <div className="content-wrapper-loading">
        <div className="loader-circle" />
        <div className="loader-line-mask">
          <div className="loader-line" />
        </div>
        <span className="icon-Unilever-Converted icon-loading-font" />
      </div>
    </div>
  );
};

export const LoadingChild = () => {
  return (
    <div className="content-wrapper-loading">
      <div className="loader-circle" />
      <div className="loader-line-mask">
        <div className="loader-line" />
      </div>
      <span className="icon-Unilever-Converted icon-loading-font" />
    </div>
  );
};

export const LoadingSpin = (props: any) => {
  return (
    <div className={props?.className}>
      <Spin size="large" />
    </div>
  );
};

export default React.memo(Loading);
