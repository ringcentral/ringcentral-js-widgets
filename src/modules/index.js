"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Root = require("./Root");
Object.keys(_Root).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Root[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Root[key];
    }
  });
});
var _Initiator = require("./Initiator");
Object.keys(_Initiator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Initiator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Initiator[key];
    }
  });
});
var _PortManager = require("./PortManager");
Object.keys(_PortManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PortManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PortManager[key];
    }
  });
});
var _PortalHost = require("./PortalHost");
Object.keys(_PortalHost).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PortalHost[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PortalHost[key];
    }
  });
});
var _Reload = require("./Reload");
Object.keys(_Reload).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Reload[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Reload[key];
    }
  });
});
var _destroy = require("./destroy");
Object.keys(_destroy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _destroy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _destroy[key];
    }
  });
});
//# sourceMappingURL=index.js.map
