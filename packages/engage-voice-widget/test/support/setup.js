import path from 'path';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocalStorage from './localStorage';

configure({ adapter: new Adapter() });

require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log = () => {};
console.debug = () => {};

window.authData = null;
window.open = () => {};
