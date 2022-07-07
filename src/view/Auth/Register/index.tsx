import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Input, Button } from 'antd';
import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';
import RenderError from '../components/RenderError';
import '../styles.scss';

const Register = () => {
  const history = useHistory();
  const { register } = authenticationPresenter;
  const registerAccount = useSingleAsync(register);
  const [errorStatus, setErrorStatus] = useState('');
  const { formatMessage } = useAltaIntl();
  const onFinishFailed = () => {
    setErrorStatus('');
  };
  const onSubmitAccount = (values: any) => {
    registerAccount
      ?.execute(values)
      .then(() => {
        setErrorStatus('');
        setTimeout(() => {
          history.push('/');
        }, 300);
      })
      .catch(() => {
        setErrorStatus(formatMessage('login.account.error'));
      });
  };

  return (
    <>
      <div className="main-form auth-form">
        <h3 className="main-title">{formatMessage('login.title')}</h3>
        <div className="content-form">
          <Form
            name="registerByAccount"
            layout="vertical"
            onFinish={onSubmitAccount}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
          >
            <Form.Item
              label={formatMessage('register.fullName')}
              name="accountFullName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder={formatMessage('register.fullName')} />
            </Form.Item>
            <Form.Item
              label={formatMessage('auth.email')}
              name="accountEmail"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder={formatMessage('auth.email')} />
            </Form.Item>
            <Form.Item
              label={formatMessage('auth.password')}
              name="accountPassword"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder={formatMessage('auth.password')} />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={formatMessage('auth.password.confirm')}
              dependencies={['accountPassword']}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, passwordConfirm) {
                    if (!passwordConfirm || getFieldValue('accountPassword') === passwordConfirm) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(formatMessage('auth.password.not.match')));
                  },
                }),
              ]}
            >
              <Input.Password placeholder={formatMessage('auth.password.confirm')} />
            </Form.Item>
            {errorStatus && <RenderError errorStatus={errorStatus} />}
            <Button htmlType="submit" className="normal-button">
              {formatMessage('register.button.account')}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
