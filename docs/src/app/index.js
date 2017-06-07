import React from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import MainView from './components/MainView';
import OverView from './pages/OverView';
import ComponentRoutes from './pages/ComponentRoutes';

import componentsData from './componentsData.json';

render(
  <Router
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <MainView components={componentsData}>
      <Route exact path="/" component={OverView} />
      <Route path="/home" component={OverView} />
      <ComponentRoutes />
    </MainView>
  </Router>
, document.getElementById('app'));
