import ReactDOM from 'react-dom';
import React from 'react';

import { createStore, combineReducers } from 'redux';
import { Provider, PhoneProvider } from '../../utils/integration/';

import RcPhone from 'ringcentral-js-integration-commons';
import config from '../../../config';

import { reducer as localeReducer } from '../../utils/locale/';

import App from './app.react';

let store;
const phone = new RcPhone({
  sdkSettings: {
    ...config,
    server: 'https://platform.devtest.ringcentral.com',
  },
  getStore(reducer) {
    store = createStore(combineReducers({
      common: reducer,
      locale: localeReducer,
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
