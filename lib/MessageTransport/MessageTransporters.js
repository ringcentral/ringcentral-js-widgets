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

var _EventEmitterTransporter = require("./EventEmitterTransporter");

Object.keys(_EventEmitterTransporter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EventEmitterTransporter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EventEmitterTransporter[key];
    }
  });
});

var _PostMessageTransporter = require("./PostMessageTransporter");

Object.keys(_PostMessageTransporter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PostMessageTransporter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PostMessageTransporter[key];
    }
  });
});
//# sourceMappingURL=MessageTransporters.js.map
