import { ObjectProxy } from './ObjectProxy';

const chromeObjectProxy = new ObjectProxy(chrome, global.apiProxy?.chrome);

/**
 * offscreen cannot access the chrome.tabs./windows. APIs,
 *
 * we should use proxy can help you access the chrome APIs directly.
 */
export const proxyChrome: typeof chrome = chromeObjectProxy.create();
