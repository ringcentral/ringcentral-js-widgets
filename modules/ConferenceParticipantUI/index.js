"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConferenceParticipantUI = require("./ConferenceParticipantUI");
Object.keys(_ConferenceParticipantUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceParticipantUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceParticipantUI[key];
    }
  });
});
var _ConferenceParticipantUI2 = require("./ConferenceParticipantUI.interface");
Object.keys(_ConferenceParticipantUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceParticipantUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceParticipantUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
