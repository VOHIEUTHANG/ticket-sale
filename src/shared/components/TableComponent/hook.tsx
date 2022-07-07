import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';
import { useRef } from 'react';

export interface IRef {
  getData: () => any;
  fetchData: (obj?: { pagination?: PaginationEntity; option?: OptionEntity }) => void;
  setOption?: (option: OptionEntity) => void;
  setPagination?: (params: PaginationEntity) => void;
  setSelection?: (params: Array<any>) => void;
  clearSelection?: () => void;
}

const useTable: () => IRef = () => {
  const ref = useRef({
    getData: () => {},
    fetchData: () => {},
    setOption: undefined,
    setPagination: undefined,
  });

  return ref.current;
};

export default useTable;
