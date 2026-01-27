"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConferenceCallAction = require("./ConferenceCallAction.interface");
Object.keys(_ConferenceCallAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceCallAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceCallAction[key];
    }
  });
});
var _ConferenceCallAction2 = require("./ConferenceCallAction");
Object.keys(_ConferenceCallAction2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceCallAction2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceCallAction2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
