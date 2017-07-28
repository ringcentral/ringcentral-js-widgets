import path from 'path';

import LocalStorage from './localstorage';

window.localStorage = new LocalStorage();

console.log = () => { };

require('dotenv').config({ path: path.join(__dirname, '.env') });

window.authData = null;
