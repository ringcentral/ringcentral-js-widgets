"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _mfeReact = require("@ringcentral/mfe-react");
Object.keys(_mfeReact).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mfeReact[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mfeReact[key];
    }
  });
});
var _mfeTransport = require("@ringcentral/mfe-transport");
Object.keys(_mfeTransport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mfeTransport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mfeTransport[key];
    }
  });
});
var _getMfeMeta = require("./getMfeMeta");
Object.keys(_getMfeMeta).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getMfeMeta[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getMfeMeta[key];
    }
  });
});
var _hooks = require("./hooks");
Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hooks[key];
    }
  });
});
var _exposeMicroApp = require("./exposeMicroApp");
Object.keys(_exposeMicroApp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _exposeMicroApp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _exposeMicroApp[key];
    }
  });
});
var _RcMicroAppView = require("./RcMicroAppView");
Object.keys(_RcMicroAppView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RcMicroAppView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RcMicroAppView[key];
    }
  });
});
var _syncMfeEntryToLocale = require("./syncMfeEntryToLocale");
Object.keys(_syncMfeEntryToLocale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _syncMfeEntryToLocale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _syncMfeEntryToLocale[key];
    }
  });
});
//# sourceMappingURL=index.js.map
