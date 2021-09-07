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

var _AnalyticsEventExtendedProps = require("./AnalyticsEventExtendedProps");

Object.keys(_AnalyticsEventExtendedProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AnalyticsEventExtendedProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AnalyticsEventExtendedProps[key];
    }
  });
});

var _AnalyticsEventExtendedProps2 = require("./AnalyticsEventExtendedProps.interface");

Object.keys(_AnalyticsEventExtendedProps2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AnalyticsEventExtendedProps2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AnalyticsEventExtendedProps2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
