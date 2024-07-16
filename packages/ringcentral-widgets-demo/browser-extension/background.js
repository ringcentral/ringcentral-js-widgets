import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { ServerTransport } from '@ringcentral-integration/commons/lib/ChromeTransport';
import getProxyServer from '@ringcentral-integration/commons/lib/proxy/getProxyServer';
import { defaultBrandConfig as brandConfig } from '@ringcentral-integration/commons/modules/Brand';
import Phone from '../dev-server/Phone';
import App from '../dev-server/containers/App';
import apiConfig from '../dev-server/api-config';
import version from '../dev-server/version';
import prefix from '../dev-server/prefix';

const transport = new ServerTransport();
const ProxyServer = getProxyServer(Phone);

const server = new ProxyServer({
  transport,
  useTabManager: false,
  apiConfig,
  brandConfig,
  prefix,
  appVersion: version,
});
global.server = server;

const store = createStore(server.reducer);
server.setStore(store);

window.addEventListener('load', () => {
  ReactDOM.render(
    <App phone={server._target} />,
    document.querySelector('div#viewport'),
  );
});

// eslint-disable-next-line no-undef
chrome.browserAction.onClicked.addListener((tab) => {
  window.open('/client.html');
});
