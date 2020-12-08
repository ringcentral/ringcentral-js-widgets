"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectionStatus = require("./connectionStatus");

Object.keys(_connectionStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _connectionStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _connectionStatus[key];
    }
  });
});

var _recordStatus = require("./recordStatus");

Object.keys(_recordStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _recordStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _recordStatus[key];
    }
  });
});

var _sessionStatus = require("./sessionStatus");

Object.keys(_sessionStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sessionStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sessionStatus[key];
    }
  });
});

var _webphoneErrors = require("./webphoneErrors");

Object.keys(_webphoneErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _webphoneErrors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _webphoneErrors[key];
    }
  });
});

var _webphoneMessages = require("./webphoneMessages");

Object.keys(_webphoneMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _webphoneMessages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _webphoneMessages[key];
    }
  });
});

var _events = require("./events");

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _events[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});

var _Webphone = require("./Webphone.interface");

Object.keys(_Webphone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Webphone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Webphone[key];
    }
  });
});

var _WebphoneBase = require("./WebphoneBase");

Object.keys(_WebphoneBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WebphoneBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WebphoneBase[key];
    }
  });
});

var _Webphone2 = require("./Webphone");

Object.keys(_Webphone2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Webphone2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Webphone2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
