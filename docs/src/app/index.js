import React from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import MainView from './components/MainView';
import OverView from './pages/OverView';
import BadgePage from './pages/Components/Badge';

import componentsData from './componentsList.json';

render(
  <Router
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <MainView components={componentsData}>
      <Route exact path="/" component={OverView} />
      <Route path="/home" component={OverView} />
      <Route path="/components/Badge" component={BadgePage} />
    </MainView>
  </Router>
, document.getElementById('app'));
