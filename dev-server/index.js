import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Phone from './Phone';
import App from './containers/App';
import RcIcon from './Icon.svg';

const phone = Phone.create();

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
