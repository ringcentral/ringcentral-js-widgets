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

var _VideoConfiguration = require("./VideoConfiguration");

Object.keys(_VideoConfiguration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VideoConfiguration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VideoConfiguration[key];
    }
  });
});

var _VideoConfiguration2 = require("./VideoConfiguration.interface");

Object.keys(_VideoConfiguration2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VideoConfiguration2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VideoConfiguration2[key];
    }
  });
});

var _userLicenseType = require("./userLicenseType");

Object.keys(_userLicenseType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _userLicenseType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userLicenseType[key];
    }
  });
});

var _videoProviders = require("./videoProviders");

Object.keys(_videoProviders).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _videoProviders[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _videoProviders[key];
    }
  });
});
//# sourceMappingURL=index.js.map
