"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCallsUniqueIdentifies = void 0;
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _contactMatchIdentify = require("./contactMatchIdentify");
var makeCallsUniqueIdentifies = exports.makeCallsUniqueIdentifies = function makeCallsUniqueIdentifies(calls) {
  var numbers = calls.map(function (_ref) {
    var ani = _ref.ani,
      callType = _ref.callType;
    var id = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
      phoneNumber: ani,
      callType: callType
    });
    return id;
  });
  return Array.from(new Set(numbers));
};
//# sourceMappingURL=callUniqueIdentifies.js.map
