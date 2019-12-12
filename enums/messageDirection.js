"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var _default = (0, _HashMap.createHashMap)({
  inbound: 'Inbound',
  outbound: 'Outbound'
});

exports["default"] = _default;
//# sourceMappingURL=messageDirection.js.map
