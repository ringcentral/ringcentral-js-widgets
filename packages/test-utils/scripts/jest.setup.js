import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Using for React UI component Unit Test.
const adapter = new Adapter();
configure({ adapter });
/* global jest */

window.Audio.prototype.pause = () => {};
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
