import { ReactNode } from 'react';

export interface IModal {
  isVisible: boolean;
  dataEdit: any;
  isReadOnly?: boolean;
}

export interface IPropsModal {
  handleRefresh: () => void;
  modal: IModal;
  setModal: (arg: any) => void;
}
export interface IFormContent {
  label?: string;
  name: string;
  render?: ReactNode;
  rules?: any;
}
