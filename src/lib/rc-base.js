const STORE = Symbol();
export default class RcBase {
  constructor(init) {
    this[STORE] = null;
    init();
  }
  get state() {
    return this[STORE].getState();
  }
  subscribe(...args) {
    return this[STORE].subscribe(...args);
  }
}

