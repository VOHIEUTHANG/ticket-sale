import './style.scss';

import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import store from '@core/store/redux';
import { useSingleAsync } from '@hook/useAsync';
import HeaderComponent from '@layout/Header';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { RootState } from '@modules';
import authenticationPresenter from '@modules/authentication/presenter';
import { removeProfile } from '@modules/authentication/profileStore';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';

import AvatarUser from './components/AvatarUser';
import ModalChangePassWord from './components/ModalChangePassWord';
import { routerViewProfile } from './router';

const UserProfile = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { formatMessage } = useAltaIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisableForm, setIsDisableForm] = useState(true);
  const user = useSelector((state: RootState) => state.profile.user);
  const updateAccounts = useSingleAsync(authenticationPresenter.updateProfile);

  const showModal = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (user != null) {
      setIsDisableForm(true);
      form.setFieldsValue(user);
    }
  }, [form, user]);

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      name: 'common.edit',
      handleAction: () => setIsDisableForm(false),
    },
    {
      iconType: 'key',
      name: 'common.change.password',
      handleAction: () => showModal(),
    },
    {
      iconType: 'logOut',
      name: 'common.logout',
      handleAction: () => {
        DeleteConfirm({
          title: formatMessage('common.logout.title'),
          content: formatMessage('common.logout.content'),
          handleOk: () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            store.dispatch(removeProfile()), history.push('/login');
          },
        });
      },
    },
  ];

  const chooseFile = (file: any) => {
    form.setFieldsValue({ avatar: file });
  };

  const onUpdateProfile = (values: any) => {
    if (values) {
      updateAccounts.execute(values).then(() => {
        authenticationPresenter.getProfile().then(() => {
          setIsDisableForm(true);
        });
      });
    }
  };

  return (
    <div>
      <div className="all-page-component">
        <div className="w-100 d-flex flex-row-reverse">
          <HeaderComponent />
        </div>
      </div>
      <div className="profile-page">
        <MainTitleComponent breadcrumbs={routerViewProfile} />
        <div className="main-component">
          <div className="profile-user__box">
            <Form
              name="userProfileForm"
              initialValues={user}
              layout="vertical"
              requiredMark={false}
              form={form}
              onFinish={onUpdateProfile}
              onResetCapture={() => {
                setIsDisableForm(true);
              }}
              id="userProfileForm"
            >
              <Row className="profile-form__box" justify="center">
                <Col span={4} className="profile-avatar">
                  <AvatarUser disabled={isDisableForm} chooseFile={chooseFile} />
                </Col>
                <Col span={12}>
                  <div className="main-form">
                    <Form.Item
                      label={formatMessage('accounts.userName')}
                      name="userName"
                      rules={[
                        {
                          required: true,
                        },
                        {
                          max: 99,
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        disabled={true}
                        placeholder={formatMessage('accounts.userName')}
                        maxLength={100}
                      />
                    </Form.Item>
                    <Form.Item
                      label={formatMessage('accounts.accountFullName')}
                      name="userFullName"
                      rules={[
                        {
                          required: true,
                        },
                        {
                          max: 99,
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        disabled={isDisableForm}
                        placeholder={formatMessage('accounts.accountFullName')}
                        maxLength={100}
                      />
                    </Form.Item>
                    <Form.Item
                      label={formatMessage('accounts.email')}
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: 'email',
                        },
                      ]}
                    >
                      <Input
                        disabled={isDisableForm}
                        placeholder={formatMessage('accounts.email')}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
            <RightMenu arrayAction={arrayAction} />
          </div>
          <ModalChangePassWord isModalVisible={isVisible} setIsModalVisible={setIsVisible} />

          <div className="button-center__box profile-button-update">
            {!isDisableForm && (
              <>
                <Button className="cancel-button mx-5" onClick={() => setIsDisableForm(true)}>
                  {formatMessage('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  className="normal-button"
                  htmlType="submit"
                  form="userProfileForm"
                  loading={updateAccounts?.status === 'loading'}
                >
                  {formatMessage('common.save')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserProfile);
