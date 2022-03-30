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
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ProxyFrameOAuth2.ProxyFrameOAuth;
  }
});

var _ProxyFrameOAuth = require("./ProxyFrameOAuth.interface");

Object.keys(_ProxyFrameOAuth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ProxyFrameOAuth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProxyFrameOAuth[key];
    }
  });
});

var _ProxyFrameOAuth2 = require("./ProxyFrameOAuth");

Object.keys(_ProxyFrameOAuth2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ProxyFrameOAuth2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProxyFrameOAuth2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
