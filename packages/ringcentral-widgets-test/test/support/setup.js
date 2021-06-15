import path from 'path';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

require('dotenv').config({ path: path.join(__dirname, '.env') });

window.setImmediate = (cb) => setTimeout(cb, 0);
console.log = () => {};
console.debug = () => {};

window.authData = null;
window.open = () => {};
