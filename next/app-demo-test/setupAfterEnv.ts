/* eslint-disable @typescript-eslint/no-explicit-any */
import type { App, SharedAppConfig } from '@ringcentral-integration/next-core';
import type { RenderResult } from '@ringcentral-integration/test-utils';
import { Logger } from '@ringcentral/mfe-logger';

// @ts-ignore
process.env.ROARR_LOG = true;

global.mockRender = (reactDOM: Element, element, renderNode) => {
  const app: RenderResult = jest
    .requireActual('@ringcentral-integration/test-utils')
    .renderComponent(
      () => reactDOM,
      {},
      {
        disableAutoThemeProvider: true,
        ...(renderNode ? { container: renderNode } : {}),
      },
    );
  global.instance.app.unmount = app.unmount;
  return app;
};

global.afterRender = (app: App<any, any, any>) => {
  global.instance = {
    ...global.instance,
    app,
  };
  return app;
};

const originalLog = Logger.prototype.log;
jest.spyOn(Logger.prototype, 'log').mockImplementation(function (...args) {
  if (global.log) {
    try {
      const context = this._options.logger.getContext();
      const serviceName = context.namespace[context.namespace.length - 1];
      global.log?.(`🐞`, `[${serviceName}]`, ...args);
    } catch (error) {
      //
    }
  }
  // Call the original implementation
  return originalLog.apply(this, args);
});

const originalDebug = Logger.prototype.debug;
jest.spyOn(Logger.prototype, 'debug').mockImplementation(function (...args) {
  if (global.log) {
    try {
      const context = this._options.logger.getContext();
      const serviceName = context.namespace[context.namespace.length - 1];
      global.log?.(`🐛`, `[${serviceName}]`, ...args);
    } catch (error) {
      //
    }
  }
  // Call the original implementation
  return originalDebug.apply(this, args);
});

const originalInfo = Logger.prototype.info;
jest.spyOn(Logger.prototype, 'info').mockImplementation(function (...args) {
  if (global.log) {
    try {
      const context = this._options.logger.getContext();
      const serviceName = context.namespace[context.namespace.length - 1];
      global.log?.(`ℹ️`, `[${serviceName}]`, ...args);
    } catch (error) {
      //
    }
  }
  // Call the original implementation
  return originalInfo.apply(this, args);
});

const originalWarn = Logger.prototype.warn;
jest.spyOn(Logger.prototype, 'warn').mockImplementation(function (...args) {
  if (global.log) {
    try {
      const context = this._options.logger.getContext();
      const serviceName = context.namespace[context.namespace.length - 1];
      global.log?.(`🪲`, `[${serviceName}]`, ...args);
    } catch (error) {
      //
    }
  }
  // Call the original implementation
  return originalWarn.apply(this, args);
});

const originalError = Logger.prototype.error;
jest.spyOn(Logger.prototype, 'error').mockImplementation(function (...args) {
  if (global.log) {
    try {
      const context = this._options.logger.getContext();
      const serviceName = context.namespace[context.namespace.length - 1];
      global.log?.(`🔥`, `[${serviceName}]`, ...args);
    } catch (error) {
      //
    }
  }
  // Call the original implementation
  return originalError.apply(this, args);
});

jest.mock('@ringcentral-integration/next-core', () => {
  const core = jest.requireActual('@ringcentral-integration/next-core');

  const instance = {
    __esModule: true,
    ...core,
    createSharedApp: async (options: SharedAppConfig<any, any, any>) => {
      const { createSharedApp } = jest.requireActual(
        '@ringcentral-integration/next-core',
      );

      return Promise.all([
        (() => {
          if (options.share.port === 'server') {
            return createSharedApp({
              ...options,
              render: () => {
                //
              },
            });
          }

          return createSharedApp({
            ...options,
            render: global.mockRender,
          }).then(global.afterRender);
        })(),
        (async () => {
          if (process.env.DEBUG?.split(',').includes('preview')) {
            const { compileAndInjectTailwindStyles } = jest.requireActual(
              '@ringcentral-integration/test-utils/lib/compileAndInjectTailwindStyles/compileAndInjectTailwindStyles',
            );
            await compileAndInjectTailwindStyles();
          }
        })(),
      ]).then(([app]) => app);
    },
  };

  if (global.log) {
    instance.logger = {
      ...core.logger,
      debug: (...args) => {
        global.log?.(`🐛`, ...args);
        core.logger.debug(...args);
      },
      info: (...args) => {
        global.log?.(`ℹ️`, ...args);
        core.logger.info(...args);
      },
      warn: (...args) => {
        global.log?.(`🪲`, ...args);
        core.logger.warn(...args);
      },
      log: (...args) => {
        global.log?.(`🐞`, ...args);
        core.logger.log(...args);
      },
      error: (...args) => {
        global.log?.(`🔥`, ...args);
        core.logger.error(...args);
      },
    };
  }

  return instance;
});

global.navigator.mediaDevices = {
  getUserMedia: () => {},
  getSupportedConstraints: () => {
    return {
      aspectRatio: true,
      autoGainControl: true,
      brightness: true,
      channelCount: true,
      colorTemperature: true,
      contrast: true,
      deviceId: true,
      displaySurface: true,
      echoCancellation: true,
      exposureCompensation: true,
      exposureMode: true,
      exposureTime: true,
      facingMode: true,
      focusDistance: true,
      focusMode: true,
      frameRate: true,
      groupId: true,
      height: true,
      iso: true,
      latency: true,
      noiseSuppression: true,
      pan: true,
      pointsOfInterest: true,
      resizeMode: true,
      sampleRate: true,
      sampleSize: true,
      saturation: true,
      sharpness: true,
      suppressLocalAudioPlayback: true,
      tilt: true,
      torch: true,
      voiceIsolation: true,
      whiteBalanceMode: true,
      width: true,
      zoom: true,
    };
  },
};

// global.AudioContext = AudioContext;

Object.defineProperty(window, 'MediaRecorder', {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      start: jest.fn(),
      ondataavailable: jest.fn(),
      onerror: jest.fn(),
      state: '',
      stop: jest.fn(),
    };
  }),
});

const onPlayMock = jest.fn();
const onPauseMock = jest.fn();
global.mockAudio = {
  play: jest.fn().mockImplementation(onPlayMock),
  onplay: onPlayMock,
  pause: jest.fn().mockImplementation(onPauseMock),
  onpause: onPauseMock,
  setSinkId: jest.fn(),
  currentTime: 0,
  volume: 1,
  src: '',
};

jest.mock('@ringcentral/juno', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@ringcentral/juno'),
    useAudio: (cb: any) => {
      cb(global.mockAudio);
      return global.mockAudio;
    },
  };
});
