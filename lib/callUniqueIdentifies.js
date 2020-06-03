"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCallsUniqueIdentifies = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.map");

var _contactMatchIdentify = require("./contactMatchIdentify");

var makeCallsUniqueIdentifies = function makeCallsUniqueIdentifies(calls) {
  var numbers = calls.map(function (_ref) {
    var ani = _ref.ani,
        callType = _ref.callType;
    var id = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
      phoneNumber: ani,
      callType: callType.toLowerCase()
    });
    return id;
  });
  return Array.from(new Set(numbers));
};

exports.makeCallsUniqueIdentifies = makeCallsUniqueIdentifies;
//# sourceMappingURL=callUniqueIdentifies.js.map
