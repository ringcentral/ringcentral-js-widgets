import { isSharedWorker } from '@ringcentral-integration/next-core';

import { createApp } from './createApp';

// clear console before shared worker re run for better debug
if (process.env.NODE_ENV !== 'production' && isSharedWorker) {
  // eslint-disable-next-line no-console
  console.clear();
}

createApp({
  name: 'app-demo',
  port: 'server',
  type: 'SharedWorker',
});
