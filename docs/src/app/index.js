import React from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import MainView from './components/MainView';
import OverView from './pages/OverView';

function SecPage() {
  return (
    <div>
      second
    </div>
  );
}

render(
  <Router
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <MainView>
      <Route exact path="/" component={OverView} />
      <Route path="/home" component={OverView} />
      <Route path="/test" component={SecPage} />
    </MainView>
  </Router>
, document.getElementById('app'));
