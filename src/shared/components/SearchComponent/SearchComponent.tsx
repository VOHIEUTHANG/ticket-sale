import React, { useState } from 'react';
import lodash from 'lodash';
import * as Icon from 'react-feather';
import { useIntl } from 'react-intl';
import { Input } from 'antd';

interface IProps {
  onChange?: (value: string) => void;
  onClick?: (value: any) => void;
  classNames?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchComponent = (props: IProps) => {
  const { classNames } = props;
  const [valueInput, setValueInput] = useState<string | undefined>();
  const intl = useIntl();
  const onClickKeyDown = (event: any) => {
    if (event.keyCode === 13 && props.onClick) {
      props.onClick(valueInput);
    }
  };

  const onSearch = React.useMemo(() => {
    return lodash.debounce(text => {
      if (props.onSearch) {
        props.onSearch(text);
      }
    }, 800);
  }, [props]);

  React.useEffect(() => {
    if (valueInput == null) {
      return;
    }
    onSearch(valueInput);
    return () => {
      onSearch.cancel();
    };
  }, [onSearch, valueInput]);

  const onChange = (e: any) => {
    const text = e.target.value;
    setValueInput(text);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={`search-bar ${classNames ? classNames : ''}`}>
      <Input
        type="text"
        onChange={onChange}
        onKeyDown={onClickKeyDown}
        placeholder={intl.formatMessage({
          id: props.placeholder,
          defaultMessage: props.placeholder,
        })}
        suffix={<Icon.Search />}
      />
      {/* <a className="icon-search" onClick={() => props.onClick(valueInput)}>
        <Icon.Search />
      </a> */}
    </div>
  );
};

export default React.memo(SearchComponent);
