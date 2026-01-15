"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConferenceCallParticipants = require("./ConferenceCallParticipants");
Object.keys(_ConferenceCallParticipants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceCallParticipants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceCallParticipants[key];
    }
  });
});
var _ConferenceCallParticipants2 = require("./ConferenceCallParticipants.interface");
Object.keys(_ConferenceCallParticipants2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceCallParticipants2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceCallParticipants2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
