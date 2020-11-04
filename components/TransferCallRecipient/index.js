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

var _InternalPanel = require("./InternalPanel");

Object.keys(_InternalPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InternalPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InternalPanel[key];
    }
  });
});

var _ManualEntryPanel = require("./ManualEntryPanel");

Object.keys(_ManualEntryPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ManualEntryPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ManualEntryPanel[key];
    }
  });
});

var _PhoneBookPanel = require("./PhoneBookPanel");

Object.keys(_PhoneBookPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PhoneBookPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PhoneBookPanel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
