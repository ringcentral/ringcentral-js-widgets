import { createApp } from './createApp';
import './main.global.scss';

// Just for worker can be build https://webpack.js.org/guides/web-workers/
export const createWorker = () => {
  new SharedWorker(
    // @ts-ignore
    /* webpackChunkName: "worker" */ new URL('./worker.ts', import.meta.url),
  );
};

const worker = global.__rc_shared_worker__?.worker;
createApp({
  name: 'app-demo',
  port: 'client',
  type: 'SharedWorker',
  worker,
});
