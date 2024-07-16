import { ObjectProxy } from './ObjectProxy';

const chromeObjectProxy = new ObjectProxy(chrome, global.apiProxy?.chrome);

export const proxyChrome: typeof chrome = chromeObjectProxy.create();
