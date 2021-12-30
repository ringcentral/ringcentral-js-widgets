import { configure } from 'enzyme';
import path from 'path';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log = () => {};
console.debug = () => {};

window.authData = null;
window.open = () => {};
