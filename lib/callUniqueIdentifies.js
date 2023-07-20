"use strict";

require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCallsUniqueIdentifies = void 0;
var _contactMatchIdentify = require("./contactMatchIdentify");
var makeCallsUniqueIdentifies = function makeCallsUniqueIdentifies(calls) {
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
exports.makeCallsUniqueIdentifies = makeCallsUniqueIdentifies;
//# sourceMappingURL=callUniqueIdentifies.js.map
