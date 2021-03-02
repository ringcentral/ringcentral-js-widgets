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

var _Analytics = require("./Analytics");

Object.keys(_Analytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Analytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Analytics[key];
    }
  });
});

var _Analytics2 = require("./Analytics.interface");

Object.keys(_Analytics2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Analytics2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Analytics2[key];
    }
  });
});

var _trackEvents = require("./trackEvents");

Object.keys(_trackEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _trackEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _trackEvents[key];
    }
  });
});

var _analyticsRouters = require("./analyticsRouters");

Object.keys(_analyticsRouters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _analyticsRouters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _analyticsRouters[key];
    }
  });
});
//# sourceMappingURL=index.js.map
