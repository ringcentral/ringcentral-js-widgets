export const enum ModuleStatus {
  Pending = 'PENDING',
  Initializing = 'INITIALIZING',
  Ready = 'READY',
  Resetting = 'RESETTING',
}

export const enum PortType {
  Server = 'SERVER',
  MainClient = 'MAIN_CLIENT',
  Client = 'CLIENT',
}

export const mainClient = 'main-client';

export const initModuleKey: unique symbol = Symbol('initModule');
export const subscribeModuleKey: unique symbol = Symbol('subscribeModule');
export const initializedKey: unique symbol = Symbol('initialized');
export const notReadyModulesKey: unique symbol = Symbol('notReadyModules');
export const depsModulesKey: unique symbol = Symbol('depsModules');
export const rehydratedKey: unique symbol = Symbol('rehydrated');
export const userIdReadyKey: unique symbol = Symbol('userIdReady');
export const ignoreReadyModulesKey: unique symbol =
  Symbol('ignoreReadyModules');
export const moduleInitTimeKey: unique symbol = Symbol('moduleInitTime');

// server port to client port
export const mainTabClientDelegate = '@@rc:main-tab-client-delegate';
export const mainTabClientReload = '@@rc:main-tab-client-reload';
// client port to server port
export const mainTabClientChange = '@@rc:main-tab-client-change';

// disable shared worker storage key
export const disableRcSharedWorkerKey = 'disableRcSharedWorker';
export const disableRcSharedWorkerLoggerKey = 'disableRcSharedWorkerLogger';

export const DEFAULT_APP_WINDOW_SIZE = {
  fold: {
    width: 300,
    height: 540,
  },
  expand: {
    width: 600,
    height: 540,
  },
};

/**
 * get the app window size when expand state changed
 * @param expanded - expand state
 * @param extraSize - extra size for add into the size if needed
 * @returns app window size
 */
export const getAppWindowSize = (
  expanded: boolean,
  extraSize?: { width: number; height: number },
) => {
  const size = expanded
    ? DEFAULT_APP_WINDOW_SIZE.expand
    : DEFAULT_APP_WINDOW_SIZE.fold;

  return extraSize
    ? {
        width: size.width + extraSize.width,
        height: size.height + extraSize.height,
      }
    : size;
};
