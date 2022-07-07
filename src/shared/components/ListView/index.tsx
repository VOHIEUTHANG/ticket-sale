import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';
import { useSingleAsync } from '@shared/hook/useAsync';
import { List } from 'antd';
import { ListGridType } from 'antd/lib/list';
import React, { ReactNode, useEffect, useState } from 'react';

interface IListView {
  apiService: (p: PaginationEntity, op?: OptionEntity) => any;
  renderItem: (item: any) => ReactNode;
  defaultPageSize: number;
  className?: string;
  grid?: ListGridType;
  filter?: OptionEntity;
}

function ListView(props: IListView) {
  const { apiService, renderItem, defaultPageSize, className, grid, filter } = props;
  const apiServiceCall = useSingleAsync(apiService);
  const [dataSource, setDataSource] = useState<any[]>();
  const [pagination, setPagination] = useState({ pageSize: defaultPageSize, total: 0 });
  const onChange = (page: number, pageSize: number) => {
    apiServiceCall.execute({ pageSize, current: page }, filter).then((res: any) => {
      setDataSource(res.data);
      setPagination(res.info);
    });
  };

  useEffect(() => {
    apiServiceCall.execute({ pageSize: defaultPageSize }, filter).then((res: any) => {
      setDataSource(res.data);
      setPagination(res.info);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPageSize, filter]);

  const flagPagination = React.useMemo(() => {
    if (dataSource == null || dataSource.length === 0) {
      return false;
    }
    return { defaultCurrent: 1, onChange, ...pagination };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, pagination]);

  return (
    <List
      className={className}
      grid={grid}
      dataSource={dataSource}
      pagination={flagPagination}
      loading={apiServiceCall.status === 'loading'}
      renderItem={(item: any) => <List.Item>{renderItem(item)}</List.Item>}
    />
  );
}

export default React.memo(ListView);
