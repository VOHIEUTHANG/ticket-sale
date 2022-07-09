import React from 'react';
import './TicketMana.scss';
import '../layout/Global.scss';

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Content from '../layout/Content';

const TicketMana = () => {
  return (
    <div className="my-container">
      <div className="ticket-management">
        <div className="col sidebar">
          <Sidebar />
        </div>
        <div className="col main-content">
          <div className="content-container">
            <Header />
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketMana;
