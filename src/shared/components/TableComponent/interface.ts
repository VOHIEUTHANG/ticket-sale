import React from 'react';
import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';
import { TableProps } from 'antd';
import { IRef } from './hook';
import { ColumnsType } from 'antd/lib/table';

export interface IBEColumnsType<RecordType = any> extends ColumnsType<RecordType> {
  permissionCode?: string;
  dataIndex?: [keyof RecordType];
}

export interface IBEPaginationTable<RecordType = any> extends TableProps<RecordType> {
  apiServices?: (...params: any) => Promise<{ data: Array<RecordType>; info: PaginationEntity }>;
  columns?: ColumnsType<RecordType>;
  defaultOption?: OptionEntity;
  register?: IRef;
  translateFirstKey?: string;
  getDataAfter?: (data: any) => void;
  disableFirstCallApi?: boolean;
  search?: {
    placeholder: string;
    align?: 'left' | 'right';
    className?: string;
  };
  hasStt?: boolean;
  onRowSelect?: (params: React.Key[]) => void;
  onRowSelectDetail?: (params: React.Key[]) => void;
}

export const InitOption: OptionEntity = {
  search: '',
  // tới dự án nào dùng tới filter sorter rồi bỏ comment ra nha
  // filter: {},
  // sorter: {
  //   sortField: "",
  //   sortOrder: "",
  // },
};

export const InitPagination: PaginationEntity = {
  pageSize: 10,
  total: 0,
  current: 1,
};
