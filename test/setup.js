import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

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

const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) {
  dotenv.config({ path: dotenvPath });
}

window.authData = null;
