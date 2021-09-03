import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Using for React UI component Unit Test.
const adapter = new Adapter();
configure({ adapter });
/* global jest, __CI__ */

window.Audio.prototype.pause = () => {};
window.HTMLMediaElement.prototype.play = async () => {};
window.setImmediate = (cb) => setTimeout(cb, 0);
window.authData = null;
window.URL = {
  createObjectURL: jest.fn(),
  revokeObjectURL: jest.fn(),
};
// Remove verbose console info in terminal.
console.debug = () => {};
console.info = () => {};
console.warn = () => {};
Element.prototype.scrollIntoView = () => {};
if (__CI__) {
  // eslint-disable-next-line
  console = new Proxy({}, { get: () => () => {} });
}

process.on('unhandledRejection', (error) => {
  // todo: check unhandledRejection error for debugging
});
