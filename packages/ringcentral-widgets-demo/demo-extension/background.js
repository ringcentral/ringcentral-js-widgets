import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { ServerTransport } from 'ringcentral-integration/lib/ChromeTransport';
import getProxyServer from 'ringcentral-integration/lib/proxy/getProxyServer';
import Phone from '../dev-server/Phone';
import App from '../dev-server/containers/App';
import apiConfig from '../dev-server/api-config';
import brandConfig from '../dev-server/brandConfig';
import version from '../dev-server/version';
import prefix from '../dev-server/prefix';

const transport = new ServerTransport();
const ProxyServer = getProxyServer(Phone);

const server = new ProxyServer({
  transport,
  useTabManager: false,
  extensionMode: true,
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
    <App
      phone={server._target}
    />,
    document.querySelector('div#viewport'),
  );
});

chrome.browserAction.onClicked.addListener((tab) => {
  window.open('/client.html');
});
