"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CPRClient = require("./CPRClient");
Object.keys(_CPRClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CPRClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CPRClient[key];
    }
  });
});
var _Feedback = require("./Feedback");
Object.keys(_Feedback).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Feedback[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Feedback[key];
    }
  });
});
var _QuickAccess = require("./QuickAccess");
Object.keys(_QuickAccess).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _QuickAccess[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _QuickAccess[key];
    }
  });
});
var _UserGuide = require("./UserGuide");
Object.keys(_UserGuide).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UserGuide[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UserGuide[key];
    }
  });
});
var _IntegrationConfig = require("./IntegrationConfig");
Object.keys(_IntegrationConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IntegrationConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IntegrationConfig[key];
    }
  });
});
//# sourceMappingURL=index.js.map
