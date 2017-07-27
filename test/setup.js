import path from 'path';

import LocalStorage from './localstorage';

window.localStorage = new LocalStorage();

function mockedMatchMedia() {
  return {
    matches: false,
    addListener() { },
    removeListener() { }
  };
}
window.matchMedia = window.matchMedia || mockedMatchMedia;

console.log = () => { };

require('dotenv').config({ path: path.join(__dirname, '.env') });

window.authData = null;
