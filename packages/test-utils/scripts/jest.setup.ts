/* global jest, __CI__ */
import debug from 'debug';
import preview from 'jest-preview';
import { TextDecoder, TextEncoder } from 'util';
import { v4 as uuidv4 } from 'uuid';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const isPreviewMode =
  process.env.PREVIEW === 'true' ||
  process.env.DEBUG?.split(',').includes('preview');

// use roarr logger and disable roarr mock logger
// doc: https://github.com/gajus/roarr?tab=readme-ov-file#nodejs
// @ts-ignore
process.env.ROARR_LOG = true;
if (typeof window !== 'undefined') {
  window.HTMLMediaElement.prototype.pause = () => {};
  window.HTMLMediaElement.prototype.play = async () => {};
  window.HTMLMediaElement.prototype.load = async () => {};
  // jsdom's setSinkId is not always thenable; Webphone AudioHelper always calls .catch()
  window.HTMLMediaElement.prototype.setSinkId = async () => {};
  window.matchMedia = () =>
    ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any);
  // @ts-ignore

  window.setImmediate = (cb) => setTimeout(cb, 0);
  // @ts-ignore
  window.authData = null;

  Element.prototype.scrollIntoView = () => {};
}

// @ts-ignore
if (__CI__ || process.env.DEBUG) {
  const log = debug('log');

  // * the printer is use for different logger in CI mode, the CI mode will show all tests once
  const printer = (...args) => {
    // in CI only print the messages when all tests are done
    if (global.__CI__) {
      global.consoleMessages.push([new Date().toJSON(), ...args]);
    } else {
      // @ts-ignore
      log(...args);
    }
  };

  // * that __log only for inner use, so not add into global type
  global.__log = log;
  global.log = printer;
  global.consoleMessages = [];

  // in CI not show any log, only show logger logs
  ['debug', 'info', 'warn', 'log', 'error'].forEach((key) => {
    console[key] = () => {};
  });
}

const debugPreview = () => {
  preview.debug();
};

global.debugPreview = debugPreview;

if (isPreviewMode && typeof MutationObserver !== 'undefined') {
  let previewDebugScheduled = false;
  const schedulePreviewDebug = () => {
    if (previewDebugScheduled) {
      return;
    }
    previewDebugScheduled = true;
    setTimeout(() => {
      previewDebugScheduled = false;
      debugPreview();
    }, 0);
  };

  schedulePreviewDebug();

  const previewObserver = new MutationObserver(() => {
    schedulePreviewDebug();
  });

  const previewRoot = document.body ?? document.documentElement;

  if (previewRoot) {
    previewObserver.observe(previewRoot, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    });
  }
}

// jest related
if (typeof window !== 'undefined') {
  window.open = jest.fn();
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();
}
// mock performance optimization
global.performance.mark = jest.fn();
global.performance.measure = jest.fn().mockReturnValue({ duration: '' });

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// @ts-ignore
global.CSSAnimation = class CSSAnimation {
  constructor() {
    // @ts-ignore
    this.currentTime = Math.random();
  }
};

if (typeof Element !== 'undefined') {
  Element.prototype.getAnimations = jest.fn(function () {
    // eslint-disable-next-line no-undef
    const ani = new CSSAnimation();
    ani.currentTime = Math.random();
    // @ts-ignore
    ani.animationName = this.style.animation.split(' ')[0];
    return [ani];
  });
}

Object.assign(global, { TextDecoder, TextEncoder });

// Mock DOMRect if not available in test environment
if (!global.DOMRect) {
  class DOMRect {
    get left() {
      return this.x;
    }
    get top() {
      return this.y;
    }
    get right() {
      return this.x + this.width;
    }
    get bottom() {
      return this.y + this.height;
    }
    constructor(
      public x: number = 0,
      public y: number = 0,
      public width: number = 0,
      public height: number = 0,
    ) {}
  }
  global.DOMRect = DOMRect as any;
}

if (typeof global.crypto?.randomUUID !== 'function') {
  global.crypto = global.crypto || ({} as Crypto);
  global.crypto.randomUUID = jest.fn().mockImplementation(uuidv4);
}
