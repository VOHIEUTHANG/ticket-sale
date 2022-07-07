import React from 'react';
import Icon from '@ant-design/icons';
const backSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.828 7.00078L8.364 9.53678L6.95 10.9508L2 6.00078L6.95 1.05078L8.364 2.46478L5.828 5.00078H13C15.1217 5.00078 17.1566 5.84364 18.6569 7.34393C20.1571 8.84422 21 10.879 21 13.0008C21 15.1225 20.1571 17.1573 18.6569 18.6576C17.1566 20.1579 15.1217 21.0008 13 21.0008H4V19.0008H13C14.5913 19.0008 16.1174 18.3686 17.2426 17.2434C18.3679 16.1182 19 14.5921 19 13.0008C19 11.4095 18.3679 9.88336 17.2426 8.75814C16.1174 7.63292 14.5913 7.00078 13 7.00078H5.828Z" />
  </svg>
);
const BackIcon = props => <Icon component={backSvg} {...props} />;
export default BackIcon;
