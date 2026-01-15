"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MoreActionWithIncomingCall = require("./MoreActionWithIncomingCall");
Object.keys(_MoreActionWithIncomingCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MoreActionWithIncomingCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MoreActionWithIncomingCall[key];
    }
  });
});
var _MoreActionWithIncomingCall2 = require("./MoreActionWithIncomingCall.interface");
Object.keys(_MoreActionWithIncomingCall2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MoreActionWithIncomingCall2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MoreActionWithIncomingCall2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
