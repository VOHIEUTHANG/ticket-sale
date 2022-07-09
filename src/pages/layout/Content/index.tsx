import React from 'react';
import SearchBar from '../Utility/SearchBar';
import Tag from '../Utility/Tag';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import './content.scss';

type TusageStatus = 'Đã sử dụng' | 'Chưa sử dụng' | 'Hết hạn';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

interface DataType {
  key: string;
  numericalOrder: number;
  bookingCode: string;
  ticketNumber: string;
  eventName: string;
  usageStatus: TusageStatus;
  dateOfUse: string;
  ticketReleaseDate: string;
  checkInGate: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'numericalOrder',
    key: 'numericalOrder',
  },
  {
    title: 'Booking code',
    dataIndex: 'bookingCode',
    key: 'bookingCode',
  },
  {
    title: 'Số vé',
    dataIndex: 'ticketNumber',
    key: 'ticketNumber',
  },
  {
    title: 'Tên sự kiện',
    key: 'eventName',
    dataIndex: 'eventName',
  },
  {
    title: 'Tình trạng sử dụng',
    key: 'usageStatus',
    dataIndex: 'usageStatus',
    render: (status: TusageStatus) => {
      const color: Color =
        status === 'Đã sử dụng' ? '#919DBA' : status === 'Chưa sử dụng' ? '#03AC00' : '#FD5959';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Ngày sử dụng',
    key: 'dateOfuse',
    dataIndex: 'dateOfuse',
  },
  {
    title: 'Ngày xuất vé',
    key: 'ticketReleaseDate',
    dataIndex: 'ticketReleaseDate',
  },
  {
    title: 'Cổng check-in',
    key: 'checkInGate',
    dataIndex: 'checkInGate',
    render: text => {
      return text ? text : '_';
    },
  },
];
const data: DataType[] = [
  {
    key: '1',
    numericalOrder: 1,
    bookingCode: 'ALT20210501',
    ticketNumber: '123456789034',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
  {
    key: '2',
    numericalOrder: 2,
    bookingCode: 'ALT20210501',
    ticketNumber: '123456789034',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Chưa sử dụng',
    dateOfUse: '',
    ticketReleaseDate: '14/04/2021',
    checkInGate: '',
  },
  {
    key: '3',
    numericalOrder: 3,
    bookingCode: 'ALT20210501',
    ticketNumber: '123456789034',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Hết hạn',
    dateOfUse: '',
    ticketReleaseDate: '14/04/2021',
    checkInGate: '',
  },
  {
    key: '4',
    numericalOrder: 4,
    bookingCode: 'ALT20210501',
    ticketNumber: '156464891479',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Hết hạn',
    dateOfUse: '',
    ticketReleaseDate: '14/04/2021',
    checkInGate: '',
  },
  {
    key: '5',
    numericalOrder: 5,
    bookingCode: '201649631896',
    ticketNumber: '156464891479',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
  {
    key: '6',
    numericalOrder: 6,
    bookingCode: '201649631896',
    ticketNumber: '148920121478',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
  {
    key: '7',
    numericalOrder: 7,
    bookingCode: '201649631896',
    ticketNumber: '148920121478',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
  {
    key: '8',
    numericalOrder: 8,
    bookingCode: '201649631896',
    ticketNumber: '148920121478',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
  {
    key: '9',
    numericalOrder: 9,
    bookingCode: '201649631896',
    ticketNumber: '148920121478',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
  {
    key: '10',
    numericalOrder: 10,
    bookingCode: '201649631896',
    ticketNumber: '148920121478',
    eventName: 'Hội chợ triển lãm tiêu dùng 2021',
    usageStatus: 'Đã sử dụng',
    dateOfUse: '14/04/2021',
    ticketReleaseDate: '14/04/2021',
    checkInGate: 'Cổng 1',
  },
];

const Content = () => {
  return (
    <div className="content">
      <div className="content__title text-style-title">Danh sách vé</div>
      <div className="content__features">
        <SearchBar placeholder="Tìm bằng số vé" width="446px" />
        <div>
          <Button
            icon={
              <span>
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z"
                    stroke="#FF993C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            }
          >
            Lọc vé
          </Button>
          <Button style={{ marginLeft: 10 }}>Xuất file (.csv)</Button>
        </div>
      </div>
      <div className="content__data">
        <div className="data-table">
          <Table
            columns={columns}
            onChange={(pagination: any) => {
              console.log('🚀 ~ file: index.tsx ~ line 229 ~ Content ~ pagination', pagination);
            }}
            pagination={{ position: ['bottomCenter'], pageSize: 9 }}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
