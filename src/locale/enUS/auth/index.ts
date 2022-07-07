import forgotPassword from './forgotPassword';
import login from './login';
import register from './register';
import resetPassword from './resetPassword';

export default {
  ...login,
  ...register,
  ...forgotPassword,
  ...resetPassword,
  'auth.opt.notification': 'OTP code will expire after <code>{time} second</code> again',
  'auth.resend.otp': 'Send OTP',
  'auth.form.required': 'Please enter',
  'auth.form.required.otp': 'Please enter OTP code',
  'auth.opt.error': 'Wrong OTP code.Please check again.',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.password.confirm': 'Password confirm',
  'auth.password.not.match': 'Password do not match',
  'auth.password.new': 'New Password',
};
