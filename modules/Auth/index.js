"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Auth = require("./Auth");
Object.keys(_Auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Auth[key];
    }
  });
});
var _Auth2 = require("./Auth.interface");
Object.keys(_Auth2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Auth2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Auth2[key];
    }
  });
});
var _authMessages = require("./authMessages");
Object.keys(_authMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authMessages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authMessages[key];
    }
  });
});
var _loginStatus = require("./loginStatus");
Object.keys(_loginStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _loginStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loginStatus[key];
    }
  });
});
var _authErrors = require("./authErrors");
Object.keys(_authErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authErrors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authErrors[key];
    }
  });
});
//# sourceMappingURL=index.js.map
