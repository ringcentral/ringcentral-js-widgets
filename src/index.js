import ReactDOM from 'react-dom';
import React from 'react';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { PhoneProvider } from './utils/integration/';

import RcPhone from 'ringcentral-js-integration-commons';
import config from '../config';

import App from './applications/standalone/app.react';
import main from './styles/main.css';
import './styles/normalize.css';
let store;
const phone = new RcPhone({
  sdkSettings: {
    ...config,
    server: 'https://platform.ringcentral.com',
  },
  getStore(reducer) {
    store = createStore(combineReducers({
      common: reducer,
    }));
    return store;
  },
  stateMapper(state) {
    return state.common;
  },
});

phone.store.subscribe(() => {
  console.log(phone.store.getState());
});

ReactDOM.render(
  <PhoneProvider phone={phone}>
    <Provider store={phone.store}>
      <App />
    </Provider>
  </PhoneProvider>,
  document.getElementById('container')
);
