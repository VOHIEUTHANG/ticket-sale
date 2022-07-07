import React from 'react';
import { Switch } from 'react-router';

import { publicRouter } from '../index';
import ShowRouter from './ShowRouter';

const PublicPage: React.FC = () => {
  return <Switch>{ShowRouter({ routers: publicRouter })}</Switch>;
};
export default PublicPage;
