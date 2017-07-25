function mockedMatchMedia() {
  return {
    matches: false,
    addListener() { },
    removeListener() { }
  };
}
window.matchMedia = window.matchMedia || mockedMatchMedia;

console.log = () => { };
