import { Table } from 'antd';
import lodash from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';
import { CheckPermissionFunc } from '@hoc/CheckPermission';
import { useSingleAsync } from '@hook/useAsync';
import { PermissionsSelector } from '@modules/authentication/profileStore';
import { useAltaIntl } from '@shared/hook/useTranslate';

import SearchComponent from '../SearchComponent/SearchComponent';
import Pagination from './Component/Pagination';
import { IBEColumnsType, IBEPaginationTable, InitOption, InitPagination } from './interface';

interface IState {
  pagination: PaginationEntity;
  option: OptionEntity;
  selection: Array<any>;
  rowKey?: any;
}

const align = {
  left: 'to-left',
  right: 'to-right',
};

const getDataWithCurrentState = (state: any, setState: (state: any) => any, repository: any) => {
  const { option, pagination } = state;
  setState((prev: any) => ({ ...prev, option }));
  if (repository) {
    return repository.execute(pagination, option).then((res: any) => {
      setState((prev: any) => {
        return {
          ...prev,
          pagination: {
            ...pagination,
            ...res?.info,
          },
        };
      });
      return Promise.resolve(res);
    });
  } else {
    setState((prev: any) => ({ ...prev, pagination }));
    return Promise.resolve(undefined);
  }
};

function toColumns<T = any>(
  columns: IBEColumnsType<T> | undefined,
  hasStt: boolean,
  translateFirstKey: string,
  currentPage: number,
  pageSize: number,
  formatMessage: any,
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  listPermissionCode?: string[],
) {
  const col = columns?.filter((item: any) => {
    const permissionCode = item?.permissionCode || null;
    if (permissionCode) {
      return CheckPermissionFunc(permissionCode, listPermissionCode);
    }
    return true;
  });

  // translate title
  const columnTranslate: any = col?.map((item: any) => {
    const key = item?.title || `${translateFirstKey}.${item?.dataIndex}`;
    // ưu tiên nếu dev truyền vào title trước nha
    const title = formatMessage(key);
    return { ...item, title };
  });

  //xét có nên thêm stt
  if (hasStt) {
    const hasSttColumn = {
      title: formatMessage('common.stt'),
      width: '5.9rem',
      className: 'text-center',
      dataIndex: 'tableComponentStt',
      render: (_text: any, _record: any, index: number) => {
        return (currentPage - 1) * pageSize + (index + 1);
      },
    };

    return [hasSttColumn, ...columnTranslate];
  }
  return columnTranslate;
}

const TableComponent: React.FC<IBEPaginationTable> = <T extends object>(
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  props: IBEPaginationTable<T>,
) => {
  const {
    apiServices,
    columns,
    register,
    defaultOption,
    translateFirstKey = 'common',
    getDataAfter,
    disableFirstCallApi = false,
    dataSource = [],
    search,
    hasStt = false,
  } = props;
  const { listPermissionCode } = useSelector(PermissionsSelector);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const repository = useSingleAsync(apiServices);
  const { formatMessage, intl } = useAltaIntl();
  const [state, setState] = useState<IState>({
    pagination: { ...InitPagination, ...props.pagination },
    option: { ...defaultOption, ...InitOption },
    selection: [],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: any = React.useMemo(() => {
    if (props.onRowSelect || props.onRowSelectDetail) {
      return {
        selectedRowKeys,
        onChange: (pSelectedRowKeys: React.Key[], selectedRows: any) => {
          setSelectedRowKeys(pSelectedRowKeys);
          if (props.onRowSelect) {
            props.onRowSelect(pSelectedRowKeys);
          }
          if (props.onRowSelectDetail) {
            props.onRowSelectDetail(selectedRows);
          }
        },
      };
    }
  }, [props, selectedRowKeys]);

  const handleClickOnRow = (record: any) => {
    if (typeof props.rowKey !== 'function') {
      return;
    }
    const tempRowKey = props.rowKey ? props.rowKey(record) : '';

    const isInArr = selectedRowKeys.some(key => key === tempRowKey);
    let tempSelectedRowKeys = [];
    if (isInArr) {
      tempSelectedRowKeys = selectedRowKeys.filter(k => k !== tempRowKey);
    } else {
      tempSelectedRowKeys = [...selectedRowKeys, tempRowKey];
    }
    setSelectedRowKeys(tempSelectedRowKeys);
    if (props.onRowSelect) {
      props.onRowSelect(tempSelectedRowKeys);
    }
  };

  const fetchData = useCallback(
    pState => {
      if (apiServices) {
        getDataWithCurrentState(pState, setState, repository).then((rs: any) => {
          if (rs != null && getDataAfter != null) {
            getDataAfter(rs);
          }
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    [apiServices, repository, getDataAfter],
  );

  useEffect(() => {
    if (!disableFirstCallApi && apiServices) {
      fetchData({
        pagination: { ...InitPagination },
        option: { ...defaultOption, ...InitOption },
      });
    }
  }, [disableFirstCallApi, apiServices, defaultOption, fetchData]);

  const handleSearch = (text: string) => {
    const pagination = { ...state.pagination, ...InitPagination };
    const option = {
      ...state.option,
      search: text,
    };
    fetchData({ pagination, option });
  };

  const handleChangePage = (newPagination: PaginationEntity, _filter?: any, _sorter?: any) => {
    const option = state.option;
    if (option) {
      option.sorter = _sorter;
    }
    let newCurrent = newPagination.current;
    if (newPagination.pageSize !== state.pagination.pageSize) {
      newCurrent = 1;
    }

    fetchData({
      pagination: { ...state.pagination, ...newPagination, current: newCurrent },
      option,
    });
    setState(prev => ({ ...prev, selection: [] }));
  };

  const getData = () => {
    return {
      data: repository?.value?.data || [],
      ...state,
    };
  };

  //React.useImperativeHandle(register,()=>{})

  if (register) {
    register.clearSelection = () => {
      setSelectedRowKeys([]);
    };
    register.getData = getData;
    register.fetchData = (...args) => {
      const param = lodash.get(args, '[0]', {});
      param.pagination = { ...state.pagination, current: 1, ...param.pagination };
      setSelectedRowKeys([]);
      fetchData(param);
    };
    register.setOption = value =>
      setState(prev => ({ ...prev, option: { ...prev.option, ...value } }));
    register.setPagination = value =>
      setState(prev => ({
        ...prev,
        pagination: { ...prev.pagination, ...value },
      }));
    register.setSelection = value => setState(prev => ({ ...prev, selection: value }));
  }

  const thisColumns = React.useMemo(() => {
    return toColumns<T>(
      columns,
      hasStt,
      translateFirstKey,
      state.pagination.current || 1,
      state.pagination.pageSize || 1,
      formatMessage,
      // eslint-disable-next-line @typescript-eslint/comma-dangle
      listPermissionCode,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, hasStt, translateFirstKey, state.pagination, formatMessage, listPermissionCode]);

  const onRowFunction: any = React.useMemo(() => {
    if (handleClickOnRow) {
      return (record: T) => ({
        onClick: () => {
          handleClickOnRow(record);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClickOnRow]);

  const searchLable = intl.formatMessage({
    id: 'common.keyword',
    defaultMessage: 'common.keyword',
  });

  return (
    <div className={`card-main-table ${props?.className}`}>
      {search?.placeholder && (
        <div className={`search-in-table ${search?.align ? align[search?.align] : 'to-right'}`}>
          <div className="search-label-default">{searchLable}</div>
          <SearchComponent
            onSearch={handleSearch}
            placeholder={search?.placeholder}
            classNames={search?.className ? search?.className : ''}
          />
        </div>
      )}
      <Table<T>
        rowSelection={rowSelection}
        onRow={onRowFunction}
        {...props}
        className="main-table"
        dataSource={repository?.value?.data || dataSource}
        loading={props?.loading || repository?.status === 'loading'}
        pagination={props.pagination !== false && state.pagination}
        onChange={handleChangePage}
        columns={thisColumns}
      />
      {props.pagination !== false && (
        <Pagination pagination={state.pagination} onChange={handleChangePage} />
      )}
    </div>
  );
};

export default React.memo(TableComponent);
