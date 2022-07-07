import { ValidateMessages } from 'rc-field-form/lib/interface';
const Form: {
  optional?: string;
  defaultValidateMessages: ValidateMessages;
} = {
  optional: '(tùy chọn)',
  defaultValidateMessages: {
    default: '${label} không đúng định dạng',
    required: 'Vui lòng nhập ${label}',
    enum: '${label} phải là 1 trong [${enum}]',
    whitespace: '${label} không thể là một khoảng trắng',
    date: {
      format: '${label} không đúng định dạng ngày tháng',
      parse: '${label} không đúng định dạng ngày tháng',
      invalid: '${label} không phải là ngày tháng',
    },
    types: {
      string: 'typeTemplate',
      method: 'typeTemplate',
      array: 'typeTemplate',
      object: 'typeTemplate',
      number: '${label} không đúng định dạng số',
      date: 'typeTemplate',
      boolean: 'typeTemplate',
      integer: 'typeTemplate',
      float: '',
      regexp: 'typeTemplate',
      email: '${label} không đúng định dạng email',
      url: '${label} không đúng định dạng url',
      hex: 'typeTemplate',
    },
    string: {
      len: '${label} phải chứa ${len} kí tự',
      min: '${label} tối thiểu ${min} kí tự ',
      max: '${label} tối đa ${max} kí tự',
      range: '${label} phải chứa từ ${min} đến ${max} kí tự',
    },
    number: {
      len: '${label} phải bằng ${len}',
      min: '${label} tối thiểu là ${min}',
      max: '${label} phải nhỏ hơn ${max}',
      range: '${label} phải nằm trong khoảng ${min} đến ${max}',
    },
    array: {
      len: '${label} phải có độ dài ${len}',
      min: '${label} phải chứa tối thiểu ${min} phần tử',
      max: '${label} phải chứa tối đa ${max} phần tử',
      range: '${label} phải chứa từ ${min} đến ${max} phần tử',
    },
    pattern: {
      mismatch: '${label} không đúng định dạng',
    },
  },
};

export default Form;
