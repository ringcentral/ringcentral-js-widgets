import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import RcPhone from 'ringcentral-js-integration-commons';
import config from '../config';

import App from './applications/incontact/app.react';
import main from './styles/main.css';
import normalize from './styles/normalize.css';

const phone = new RcPhone({
  sdkSettings: {
    ...config,
    server: 'https://platform.ringcentral.com',
  },
});

ReactDOM.render(
  <Provider store={phone.store}>
    <App phone={phone}/>
  </Provider>,
  document.getElementById('container')
);
