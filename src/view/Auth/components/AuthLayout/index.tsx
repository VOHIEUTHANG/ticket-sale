import React, { PropsWithChildren } from 'react';
import { logo } from '@shared/assets/images';
import ChangeLanguage from '@shared/components/ChangeLanguage';

const AuthLayout: React.FC<PropsWithChildren<any>> = props => {
  return (
    <div className="auth-page">
      <div className="language__box">
        <ChangeLanguage className="label-language-login" />
      </div>
      <div className="main__box">
        <div className="logo__box">
          <img src={logo} alt="logo" />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);
