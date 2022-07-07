import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import { logo } from '@assets/images';
import './styles.scss';
const PageError = () => {
  const history = useHistory();
  const intl = useIntl();

  return (
    <div className="page-error">
      <div className="main-content">
        <div className="label-logo-forgot">
          <img src={logo} alt="pepsico" />
        </div>
        <div className="title-404">{intl.formatMessage({ id: 'common.404error' })}</div>
        <div className="page-not-found">{intl.formatMessage({ id: 'common.page.notfound' })}</div>
        <p className="note-404">{intl.formatMessage({ id: 'common.404note' })}</p>
        <Button className="btn-err">
          <a onClick={() => history.push('/')}>{intl.formatMessage({ id: 'common.back' })}</a>
        </Button>
      </div>
    </div>
  );
};

export default PageError;
