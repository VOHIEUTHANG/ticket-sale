export interface IError {
  errorStatus: string;
}
export interface INavLink {
  navLink: string;
  onClick: () => void;
}
export interface IUpdatePasswordForm {
  recoveryToken: string;
}
