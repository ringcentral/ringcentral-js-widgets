import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { URL } from 'url';

// Using for React UI component Unit Test.
const adapter = new Adapter();
configure({ adapter });
/* global jest, __CI__ */

window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.play = async () => {};
window.setImmediate = (cb) => setTimeout(cb, 0);
window.authData = null;
window.URL = URL;
window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();
Element.prototype.scrollIntoView = () => {};

['debug', 'info', 'warn', 'log', 'error', 'time', 'timeEnd'].forEach((key) => {
  const fn = console[key];
  jest.spyOn(console, key).mockImplementation(__CI__ ? () => {} : fn);
});

process.on('unhandledRejection', (error) => {
  // todo: check unhandledRejection error for debugging
});
