import React from 'react';
import { Typography } from 'antd';

interface IFormNote {
  className?: string;
  text: string | React.ReactNode;
}
const FormNote: React.FC<IFormNote> = ({ text, className }) => {
  return <Typography.Text className={className || 'form-note'}>{text}</Typography.Text>;
};
export default FormNote;
