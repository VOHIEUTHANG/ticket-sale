import authenticationPresenter from '@modules/authentication/presenter';
import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import RenderError from '@view/Auth/components/RenderError';
import { IUpdatePasswordForm } from '@view/Auth/interface';
import { Input, Button, Form } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const UpdatePasswordForm: React.FC<IUpdatePasswordForm> = props => {
  const history = useHistory();
  const { formatMessage } = useAltaIntl();
  const { resetPass } = authenticationPresenter;
  const resetPasswordCall = useSingleAsync(resetPass);

  const [errorStatus, setErrorStatus] = useState('');
  const onSubmitResetPassword = values => {
    resetPasswordCall?.execute(values, props.recoveryToken).then(() => {
      history.push('/login');
    });
  };

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  return (
    <div className="main-form auth-form">
      <h3 className="main-title">{formatMessage('reset.password.title')}</h3>
      <div className="content-form">
        <Form
          name="resetPassword"
          layout="vertical"
          onFinish={onSubmitResetPassword}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <Form.Item
            label={formatMessage('auth.password.new')}
            name="accountPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder={formatMessage('auth.password.new')} />
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
            {formatMessage('common.button.accept')}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
