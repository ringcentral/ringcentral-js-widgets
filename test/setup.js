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
