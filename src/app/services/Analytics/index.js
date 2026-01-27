"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  trackEvent: true
};
Object.defineProperty(exports, "trackEvent", {
  enumerable: true,
  get: function get() {
    return _trackEvent.trackEvent;
  }
});
var _Analytics = require("./Analytics");
Object.keys(_Analytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
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
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Analytics2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Analytics2[key];
    }
  });
});
var _analyticsRouters = require("./analyticsRouters");
Object.keys(_analyticsRouters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _analyticsRouters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _analyticsRouters[key];
    }
  });
});
var _track = require("./track");
Object.keys(_track).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _track[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _track[key];
    }
  });
});
var _useTracking = require("./useTracking");
Object.keys(_useTracking).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTracking[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useTracking[key];
    }
  });
});
var _execTracking = require("./execTracking");
Object.keys(_execTracking).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _execTracking[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _execTracking[key];
    }
  });
});
var _trackEvent = require("./trackEvent");
//# sourceMappingURL=index.js.map
