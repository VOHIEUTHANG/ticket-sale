import { Button, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';

interface IChangePassWord {
  isModalVisible: boolean;
  setIsModalVisible: (arg: any) => void;
}

const ModalChangePassWord = (props: IChangePassWord) => {
  const { isModalVisible, setIsModalVisible } = props;
  const { formatMessage } = useAltaIntl();
  const [form] = useForm();
  const updateAccounts = useSingleAsync(authenticationPresenter.updateProfile);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    delete values.confirmPassword;
    if (values) {
      updateAccounts?.execute(values).then(() => {
        authenticationPresenter.getProfile().then(() => {
          handleCancel();
        });
      });
    }
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      footer={false}
      title={formatMessage('accounts.change.password.title')}
      className="main-modal"
      visible={isModalVisible}
      destroyOnClose={true}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
    >
      <Form
        className="main-form"
        layout="vertical"
        name="formChangePassword"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label={formatMessage('accounts.newPassword')}
          name="password"
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*\(\)-_=+:";{}[\]\\\/<>.,~`]).{8,}$/g,
              min: 8,
            },
          ]}
        >
          <Input.Password placeholder={formatMessage('accounts.newPassword')} />
        </Form.Item>

        <Form.Item
          label={formatMessage('accounts.confirm.newPassword')}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(formatMessage('password.not.match')));
              },
            }),
          ]}
        >
          <Input.Password placeholder={formatMessage('accounts.confirm.newPassword')} />
        </Form.Item>
        <Form.Item className="my-5">
          <Space className="w-100" style={{ justifyContent: 'space-evenly' }}>
            <Button
              className="cancel-button button-modal"
              htmlType="reset"
              onClick={() => onCancel()}
            >
              {formatMessage('common.cancel')}
            </Button>
            <Button type="primary" className="normal-button button-modal" htmlType="submit">
              {formatMessage('common.save')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangePassWord;
