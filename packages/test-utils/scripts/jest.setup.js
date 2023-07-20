/* global jest, __CI__ */
import { URL } from 'url';
import debug from 'debug';
import preview from 'jest-preview';

window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.play = async () => {};
window.HTMLMediaElement.prototype.load = async () => {};
window.setImmediate = (cb) => setTimeout(cb, 0);
window.authData = null;
window.open = jest.fn();
window.URL = URL;
window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();
Element.prototype.scrollIntoView = () => {};

['debug', 'info', 'warn', 'log', 'error', 'time', 'timeEnd'].forEach((key) => {
  const fn = console[key];
  jest
    .spyOn(console, key)
    .mockImplementation(__CI__ || process.env.DEBUG ? () => {} : fn);
});

process.on('unhandledRejection', (error) => {
  // TODO: check unhandledRejection error for debugging
});

global.log = debug('log');

global.debugPreview = preview.debug;

// mock performance optimization
global.performance.mark = jest.fn();
global.performance.measure = jest.fn().mockReturnValue({ duration: '' });

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
