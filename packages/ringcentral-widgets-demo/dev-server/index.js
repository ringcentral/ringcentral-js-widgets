import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { createPhone } from './Phone';
import App from './containers/App';
import RcIcon from './Icon.svg';
import apiConfig from './api-config';
import brandConfig from './brandConfig';
import version from './version';
import prefix from './prefix';

const phone = createPhone({
  apiConfig, brandConfig, prefix, version
});

const store = createStore(phone.reducer);

phone.setStore(store);

window.phone = phone;

ReactDOM.render(
  <App
    phone={phone}
    icon={RcIcon}
  />,
  document.querySelector('div#viewport'),
);
