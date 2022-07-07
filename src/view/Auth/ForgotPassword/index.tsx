import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Input } from 'antd';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import NavLinkBottom from '../components/NavLinkBottom';
import RenderError from '../components/RenderError';

const ForgotPassword = () => {
  const history = useHistory();
  const { formatMessage } = useAltaIntl();
  const { forgotPass } = authenticationPresenter;
  const forgotPasswordCall = useSingleAsync(forgotPass);
  const [errorStatus, setErrorStatus] = useState('');
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  const onSubmitEmail = (values: any) => {
    forgotPasswordCall
      ?.execute(values)
      .then(() => {
        setCheckSuccessEmail(true);
      })
      .catch(() => {
        setErrorStatus(formatMessage('forgot.password.email.not.exit'));
      });
  };

  return (
    <>
      <div className="main-form auth-form">
        <h3 className="main-title">{formatMessage('forgot.password.title')}</h3>
        {!checkSuccessEmail ? (
          <>
            <p className="description">{formatMessage('forgot.password.description')}</p>
            <div className="content-form">
              <Form
                name="forgotPassword"
                layout="vertical"
                onFinish={onSubmitEmail}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
              >
                <Form.Item
                  label={formatMessage('forgot.password.email')}
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: 'email',
                    },
                  ]}
                >
                  <Input placeholder="david@gmail.com" />
                </Form.Item>
                {errorStatus && <RenderError errorStatus={errorStatus} />}
                <Button htmlType="submit" className="normal-button">
                  {formatMessage('forgot.password.button.accept')}
                </Button>
              </Form>
            </div>
          </>
        ) : (
          <div className="status__box">
            <p>{formatMessage('forgot.password.notification')}</p>
          </div>
        )}
      </div>
      <NavLinkBottom
        navLink={formatMessage('link.return.login')}
        onClick={() => history.push('/login')}
      />
    </>
  );
};
export default ForgotPassword;
