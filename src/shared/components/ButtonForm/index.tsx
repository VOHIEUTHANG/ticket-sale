import { useAltaIntl } from '@shared/hook/useTranslate';
import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

interface IButtonForm {
  nameButtonSubmit: string;
  className?: string;
  formName: string;
  isLoading?: boolean;
  onCancelForm?: any;
  isDisabled?: any;
  onOkForm?: any;
}

const ButtonForm: React.FC<IButtonForm> = ({
  nameButtonSubmit,
  className,
  formName,
  isLoading = false,
  onCancelForm,
  onOkForm,
  isDisabled = false,
}) => {
  const { formatMessage } = useAltaIntl();
  const history = useHistory();
  const callOnCancelForm = React.useMemo(() => {
    if (onCancelForm) {
      return onCancelForm;
    }
    return () => history.goBack();
  }, [onCancelForm, history]);

  const callOnOkForm = React.useMemo(() => {
    if (onOkForm) {
      return onOkForm;
    }
    return undefined;
  }, [onOkForm]);

  return (
    <div className={`button-center__box ${className}`}>
      {isDisabled ? (
        <Button className="cancel-button" onClick={callOnCancelForm}>
          {formatMessage('common.close')}
        </Button>
      ) : (
        <>
          <Button className="cancel-button mr-5" onClick={callOnCancelForm}>
            {formatMessage('common.cancel')}
          </Button>
          <Button
            loading={isLoading}
            type="primary"
            className="normal-button"
            htmlType="submit"
            form={formName}
            disabled={isDisabled}
            onClick={callOnOkForm}
          >
            {formatMessage(nameButtonSubmit)}
          </Button>
        </>
      )}
    </div>
  );
};
export default ButtonForm;
