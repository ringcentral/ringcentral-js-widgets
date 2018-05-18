import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import { createPhone } from './modules/Phone';
import App from './containers/App';
import brandConfig from './brand';
import prefix from './prefix';

const apiConfig = process.env.API_CONFIG;
const appVersion = process.env.APP_VERSION;
const hostingUrl = process.env.HOSTING_URL;

const redirectUri = apiConfig.redirectUri;

const phone = createPhone({
  apiConfig,
  brandConfig,
  prefix,
  appVersion,
  redirectUri,
});

const store = createStore(phone.reducer);

phone.setStore(store);

window.phone = phone;

ReactDOM.render(
  <App
    phone={phone}
    hostingUrl={hostingUrl}
  />,
  document.querySelector('div#viewport'),
);

