/* global jest, __CI__ */
import debug from 'debug';
import preview from 'jest-preview';
import { TextDecoder, TextEncoder } from 'util';

window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.play = async () => {};
window.HTMLMediaElement.prototype.load = async () => {};
window.setImmediate = (cb) => setTimeout(cb, 0);
window.authData = null;

Element.prototype.scrollIntoView = () => {};

if (__CI__ || process.env.DEBUG) {
  const log = debug('log');

  // * the printer is use for different logger in CI mode, the CI mode will show all tests once
  const printer = (...args) => {
    // in CI only print the messages when all tests are done
    if (global.__CI__) {
      global.consoleMessages.push([new Date().toJSON(), ...args]);
    } else {
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

global.debugPreview = preview.debug;

// jest related
window.open = jest.fn();
window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();
// mock performance optimization
global.performance.mark = jest.fn();
global.performance.measure = jest.fn().mockReturnValue({ duration: '' });

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.CSSAnimation = class CSSAnimation {
  constructor() {
    this.currentTime = Math.random();
  }
};

Element.prototype.getAnimations = jest.fn(function () {
  // eslint-disable-next-line no-undef
  const ani = new CSSAnimation();
  ani.currentTime = Math.random();
  ani.animationName = this.style.animation.split(' ')[0];
  return [ani];
});

Object.assign(global, { TextDecoder, TextEncoder });
