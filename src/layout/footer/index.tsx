import React from 'react';
import { NavLink } from 'react-router-dom';

import { IRouter } from '@routers/interface';

interface PropsPage {
  routers?: Array<IRouter>;
}

function PaginationBar({ routers }: PropsPage) {
  return (
    <div className="paginationBar">
      {routers?.map((r, i) => {
        if (r.menu == null) {
          return <></>;
        }
        if (r.external === true) {
          return <></>;
        }
        return <NavLink to={r.path} className="paginationBar-item" key={i}></NavLink>;
      })}
    </div>
  );
}

export default PaginationBar;
