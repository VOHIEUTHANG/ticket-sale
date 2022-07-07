import React from 'react';

interface ISelect<T = React.Key> {
  value?: string | number;
  label?: string;
  data?: T;
}

export default ISelect;
