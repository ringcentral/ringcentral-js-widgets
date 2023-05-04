"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createStore: true,
  setPatchesToggle: true,
  subscribe: true,
  watch: true,
  action: true,
  computed: true,
  state: true,
  getStagedState: true
};
Object.defineProperty(exports, "action", {
  enumerable: true,
  get: function get() {
    return _index.action;
  }
});
Object.defineProperty(exports, "computed", {
  enumerable: true,
  get: function get() {
    return _index.computed;
  }
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function get() {
    return _createStore.createStore;
  }
});
Object.defineProperty(exports, "getStagedState", {
  enumerable: true,
  get: function get() {
    return _index2.getStagedState;
  }
});
Object.defineProperty(exports, "setPatchesToggle", {
  enumerable: true,
  get: function get() {
    return _createStore.setPatchesToggle;
  }
});
Object.defineProperty(exports, "state", {
  enumerable: true,
  get: function get() {
    return _index.state;
  }
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function get() {
    return _subscribe.subscribe;
  }
});
Object.defineProperty(exports, "watch", {
  enumerable: true,
  get: function get() {
    return _subscribe.watch;
  }
});

var _createStore = require("./createStore");

var _subscribe = require("./subscribe");

var _index = require("./decorators/index");

var _index2 = require("./utils/index");

var _immer = require("immer");

Object.keys(_immer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _immer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _immer[key];
    }
  });
});

var _interface = require("./interface");

Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});

var _constant = require("./constant");

Object.keys(_constant).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constant[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constant[key];
    }
  });
});
//# sourceMappingURL=index.js.map
