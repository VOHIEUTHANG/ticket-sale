import { Modal } from 'antd';
const { confirm } = Modal;
interface IFaceConfirm {
  handleOk?: (...args: any[]) => any;
  handleCancel?: (...args: any[]) => any;
  content?: any;
  title?: any;
  okText?: string;
  width?: any;
  cancelText?: string;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
}

export const DeleteConfirm = (props: IFaceConfirm) => {
  const { handleOk, handleCancel, content, title, okText, width, cancelText, type } = props;
  return confirm({
    style: { marginTop: '5%' },
    width: width || 500,
    title,
    content,
    type: type || 'confirm',
    cancelText,
    okText,
    className: 'modal-delete-confirm',
    onCancel: handleCancel,
    onOk: handleOk,
  });
};
