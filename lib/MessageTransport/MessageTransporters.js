"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
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
