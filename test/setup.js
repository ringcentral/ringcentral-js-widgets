import 'isomorphic-fetch';
import path from 'path';

import LocalStorage from './localStorage';

require('dotenv').config({ path: path.join(__dirname, '.env') });

window.localStorage = new LocalStorage();
console.log = () => { };
console.debug = () => { };

window.authData = null;
