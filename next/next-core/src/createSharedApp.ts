/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type App,
  createSharedApp as createApp,
  type PartialKeys,
  type Renderer,
  type SharedAppConfig as Config,
  type ListenerOptions,
} from 'reactant-share';

import {
  disableRcSharedWorkerKey,
  disableRcSharedWorkerLoggerKey,
} from './constant';
import { Root, Initiator, PortManager } from './modules';

export const createSharedApp = async <
  T,
  S extends any[],
  R extends Renderer<S>,
>({
  modules,
  ...options
}: PartialKeys<Config<T, S, R>, 'render'>): Promise<App<T, S, R>> => {
  let time;
  if (process.env.NODE_ENV === 'development') {
    time = Date.now();
  }

  workerModeDebugger(options);

  const app = await createApp({
    modules: [Root, PortManager, Initiator, ...modules!],
    ...options,
    render: (options.render ??
      ((..._: Parameters<Config<T, S, R>['render']>) => {
        //
      })) as Config<T, S, R>['render'],
    devOptions: {
      ...options.devOptions,
      autoComputed: options.devOptions?.autoComputed ?? true,
    },
  });
  if (process.env.NODE_ENV === 'development') {
    const executionTime = Date.now() - time!;
    // eslint-disable-next-line no-console
    console.log(`[next-core] createSharedApp took ${executionTime}ms`);
    if (executionTime > 2000) {
      throw new Error(
        `createSharedApp execution time is too long(${executionTime}ms), please check the performance issue.`,
      );
    }
  }

  globalThis.app = app;

  const destroy = app.destroy;
  app.destroy = () => {
    const root = app.container.got(Root)!;
    root.destroy();

    destroy();
  };

  return app;
};

export const workerModeDebugger = (options: ListenerOptions<any>) => {
  if (globalThis.SharedWorker && options.share.type === 'SharedWorker') {
    if (globalThis.localStorage?.getItem(disableRcSharedWorkerLoggerKey)) {
      options.share.enableTransportDebugger = true;
      options.share.transportLogger = (listenOptions: ListenerOptions<any>) => {
        const size = JSON.stringify(listenOptions).length / 1024;
        console[size > 500 ? 'warn' : 'log'](
          `[next-core] [${listenOptions.type}] [size]`,
          `${size} KB`,
        );
        console.log('[next-core] [transportLogger]', listenOptions);
      };
    }
    if (globalThis.localStorage?.getItem(disableRcSharedWorkerKey)) {
      options.share.type = 'Base';
      delete options.share.port;

      // eslint-disable-next-line no-console
      console.warn(
        `%c[next-core] Base mode enabled, SharedWorker is disabled by manually set localStorage,

  use %c"app.modules.Initiator.enableSharedWorker()"%c to enable SharedWorker
  if want disable again, use %c"app.modules.Initiator.disableSharedWorker()"`,
        'font-size:2em',
        'color:red;font-size:2em',
        'font-size:2em',
        'color:red;font-size:2em',
      );
    }
  }
};
