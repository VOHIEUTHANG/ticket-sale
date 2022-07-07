import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import login from './login';
import register from './register';
export default {
  ...login,
  ...register,
  ...forgotPassword,
  ...resetPassword,
  'auth.opt.notification': 'Mã OTP sẽ hết hiệu lực sau <code>{time} giây</code> nữa',
  'auth.resend.otp': 'Gửi lại OTP',
  'auth.form.required': 'Vui lòng nhập',
  'auth.form.required.otp': 'Vui lòng nhập mã OTP',
  'auth.opt.error': 'Sai mã OTP. Vui lòng kiểm tra lại.',
  'auth.email': 'Email',
  'auth.password': 'Mật khẩu',
  'auth.password.confirm': 'Xác nhận mật khẩu',
  'auth.password.not.match': 'Hai mật khẩu bạn đã nhập không khớp!',
  'auth.password.new': 'Mật khẩu mới',
};
