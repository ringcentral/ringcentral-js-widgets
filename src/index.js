import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PhoneProvider } from './utils/integration/';

import RcPhone from 'ringcentral-js-integration-commons';
import config from '../config';

import App from './applications/demo/app.react';
import main from './styles/main.css';
import normalize from './styles/normalize.css';

const phone = new RcPhone({
  sdkSettings: {
    ...config,
    server: 'https://platform.ringcentral.com',
  },
});

ReactDOM.render(
  <PhoneProvider phone={phone}>
    <Provider store={phone.store}>
      <App />
    </Provider>
  </PhoneProvider>,
  document.getElementById('container')
);
