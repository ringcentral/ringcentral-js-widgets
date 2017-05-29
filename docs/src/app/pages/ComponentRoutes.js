import React from 'react';
import { Route } from 'react-router-dom';

import BadgePage from './Components/Badge';
import ButtonPage from './Components/Button';

const Routes = () => (
  <div>
    <Route path="/components/Badge" component={BadgePage} />
    <Route path="/components/Button" component={ButtonPage} />
  </div>
);

export default Routes;
